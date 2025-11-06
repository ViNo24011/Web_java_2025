package com.btl.java_web.config;

import com.btl.java_web.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull; // Quan trọng, import @NonNull của Spring
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component // Báo cho Spring biết đây là một Bean (thành phần)
public class JwtAuthenticationFilter extends OncePerRequestFilter { // Đảm bảo filter chỉ chạy 1 LẦN cho mỗi request

    @Autowired
    private JwtService jwtService; // Dịch vụ JWT (từ Bước 2)

    @Autowired
    private UserDetailsService userDetailsService; // Dịch vụ tìm User (từ SecurityConfig)

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Lấy "Authorization header" từ request
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // 2. Kiểm tra xem header có tồn tại và có bắt đầu bằng "Bearer " không
        //    (Nếu không có thì đây là request public, cho nó đi tiếp)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Cho request đi tiếp
            return; // Dừng xử lý
        }

        // 3. Lấy token từ header (loại bỏ "Bearer ")
        jwt = authHeader.substring(7); // "Bearer " có 7 ký tự

        try {
            // 4. Giải mã token để lấy username
            username = jwtService.extractUsername(jwt);

            // 5. Kiểm tra: username đã có và CHƯA được xác thực
            //    (SecurityContextHolder.getContext().getAuthentication() == null)
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // 6. Tải thông tin UserDetails (Account) từ CSDL
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

                // 7. Kiểm tra token có hợp lệ không (so sánh username và thời gian hết hạn)
                if (jwtService.isTokenValid(jwt, userDetails)) {

                    // 8. TẠO RA MỘT XÁC THỰC MỚI (nếu token hợp lệ)
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, // Thông tin user
                            null,        // Mật khẩu (không cần thiết ở đây)
                            userDetails.getAuthorities() // Quyền (ví dụ: ROLE_USER)
                    );

                    // 9. Bổ sung chi tiết request vào
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    // 10. QUAN TRỌNG: Cập nhật SecurityContextHolder
                    //     Đây là lúc "báo" cho Spring Security: "OK, người này đã được xác thực"
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // Nếu có lỗi khi giải mã token (ví dụ: hết hạn, sai chữ ký)
            // Chúng ta không làm gì cả, chỉ để request đi tiếp
            // Và vì không setAuthentication, Spring Security sẽ tự coi là "chưa xác thực" (lỗi 401/403)
        }

        // 11. Cho request đi tiếp đến Filter tiếp theo hoặc Controller
        filterChain.doFilter(request, response);
    }
}