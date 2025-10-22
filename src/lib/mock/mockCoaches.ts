import { ICoach } from "@/types";

const mockCoaches: ICoach[] = [
  {
    coach_id: "C-LIMO-001",
    coach_type: "limousine",
    total_seat: 45,
    status: "running",
  },
  {
    coach_id: "C-LIMO-002",
    coach_type: "limousine",
    total_seat: 45,
    status: "running",
  },
  {
    coach_id: "C-LIMO-003",
    coach_type: "limousine",
    total_seat: 45,
    status: "maintenance",
  },
  {
    coach_id: "C-LIMO-004",
    coach_type: "limousine",
    total_seat: 45,
    status: "running",
  },
  {
    coach_id: "C-LIMO-005",
    coach_type: "limousine",
    total_seat: 45,
    status: "inactive",
  },
  {
    coach_id: "C-CABIN-001",
    coach_type: "limousine_cabin",
    total_seat: 24,
    status: "running",
  },
  {
    coach_id: "C-CABIN-002",
    coach_type: "limousine_cabin",
    total_seat: 24,
    status: "running",
  },
  {
    coach_id: "C-CABIN-003",
    coach_type: "limousine_cabin",
    total_seat: 24,
    status: "maintenance",
  },
  {
    coach_id: "C-CABIN-004",
    coach_type: "limousine_cabin",
    total_seat: 24,
    status: "running",
  },
  {
    coach_id: "C-CABIN-005",
    coach_type: "limousine_cabin",
    total_seat: 24,
    status: "inactive",
  },
  {
    coach_id: "C-MINI-001",
    coach_type: "minibus",
    total_seat: 16,
    status: "running",
  },
  {
    coach_id: "C-MINI-002",
    coach_type: "minibus",
    total_seat: 16,
    status: "running",
  },
  {
    coach_id: "C-MINI-003",
    coach_type: "minibus",
    total_seat: 16,
    status: "maintenance",
  },
  {
    coach_id: "C-MINI-004",
    coach_type: "minibus",
    total_seat: 16,
    status: "running",
  },
  {
    coach_id: "C-MINI-005",
    coach_type: "minibus",
    total_seat: 16,
    status: "inactive",
  },
  {
    coach_id: "C-MINI-006",
    coach_type: "minibus",
    total_seat: 16,
    status: "running",
  },
  {
    coach_id: "C-LIMO-006",
    coach_type: "limousine",
    total_seat: 45,
    status: "running",
  },
  {
    coach_id: "C-LIMO-007",
    coach_type: "limousine",
    total_seat: 45,
    status: "maintenance",
  },
  {
    coach_id: "C-CABIN-006",
    coach_type: "limousine_cabin",
    total_seat: 24,
    status: "running",
  },
  {
    coach_id: "C-MINI-007",
    coach_type: "minibus",
    total_seat: 16,
    status: "running",
  },
];

// Helper functions for filtering and statistics
export const getCoachesByType = (coachType: string): ICoach[] => {
  return mockCoaches.filter((coach) => coach.coach_type === coachType);
};

export const getCoachesByStatus = (status: string): ICoach[] => {
  return mockCoaches.filter((coach) => coach.status === status);
};

export const getCoachesBySeatRange = (
  minSeats: number,
  maxSeats: number
): ICoach[] => {
  return mockCoaches.filter(
    (coach) => coach.total_seat >= minSeats && coach.total_seat <= maxSeats
  );
};

export const getCoachStats = () => {
  const totalCoaches = mockCoaches.length;
  const runningCoaches = mockCoaches.filter(
    (coach) => coach.status === "running"
  ).length;
  const maintenanceCoaches = mockCoaches.filter(
    (coach) => coach.status === "maintenance"
  ).length;
  const inactiveCoaches = mockCoaches.filter(
    (coach) => coach.status === "inactive"
  ).length;

  const limousineCount = mockCoaches.filter(
    (coach) => coach.coach_type === "limousine"
  ).length;
  const cabinCount = mockCoaches.filter(
    (coach) => coach.coach_type === "limousine_cabin"
  ).length;
  const minibusCount = mockCoaches.filter(
    (coach) => coach.coach_type === "minibus"
  ).length;

  const totalSeats = mockCoaches.reduce(
    (sum, coach) => sum + coach.total_seat,
    0
  );

  return {
    totalCoaches,
    runningCoaches,
    maintenanceCoaches,
    inactiveCoaches,
    limousineCount,
    cabinCount,
    minibusCount,
    totalSeats,
    availabilityRate: `${((runningCoaches / totalCoaches) * 100).toFixed(1)}%`,
  };
};

export const getCoachById = (coachId: string): ICoach | undefined => {
  return mockCoaches.find((coach) => coach.coach_id === coachId);
};

export const getAvailableCoaches = (): ICoach[] => {
  return mockCoaches.filter((coach) => coach.status === "running");
};

export const getCoachesBySeatCount = (seatCount: number): ICoach[] => {
  return mockCoaches.filter((coach) => coach.total_seat === seatCount);
};

export const getCoachTypeStats = () => {
  const stats = mockCoaches.reduce((acc, coach) => {
    if (!acc[coach.coach_type]) {
      acc[coach.coach_type] = {
        total: 0,
        running: 0,
        maintenance: 0,
        inactive: 0,
      };
    }
    acc[coach.coach_type].total++;
    acc[coach.coach_type][
      coach.status as keyof (typeof acc)[typeof coach.coach_type]
    ]++;
    return acc;
  }, {} as Record<string, { total: number; running: number; maintenance: number; inactive: number }>);

  return stats;
};

export default mockCoaches;
