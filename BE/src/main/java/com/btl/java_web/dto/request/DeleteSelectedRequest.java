package com.btl.java_web.dto.request;

import lombok.Data;

import java.util.List;
@Data
public class DeleteSelectedRequest {
    private List<String> ids;
}
