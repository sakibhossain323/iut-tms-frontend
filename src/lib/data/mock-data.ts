export const vehicles = [
    {
        id: "BUS-101",
        type: "Bus",
        capacity: 45,
        registrationNumber: "XYZ-1234",
        status: "available",
        currentAssignment: "None",
    },
    {
        id: "BUS-102",
        type: "Bus",
        capacity: 45,
        licensePlate: "XYZ-1235",
        status: "on-trip",
        currentAssignment: "Route A - Morning",
    },
    {
        id: "BUS-103",
        type: "Bus",
        capacity: 30,
        licensePlate: "XYZ-1236",
        status: "on-trip",
        currentAssignment: "HR Training Session",
    },
    {
        id: "VAN-201",
        type: "Van",
        capacity: 15,
        licensePlate: "ABC-2345",
        status: "available",
        currentAssignment: "None",
    },
    {
        id: "CAR-301",
        type: "Car",
        capacity: 4,
        licensePlate: "DEF-3456",
        status: "maintenance",
        currentAssignment: "Under Repair",
    },
];
export const requisitions = [
    {
        id: "REQ-001",
        requester: "John Doe",
        department: "Marketing",
        purpose: "Company Outing",
        date: "May 20, 2025",
        time: "8:00 AM - 5:00 PM",
        passengers: 30,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-002",
        requester: "Alice Johnson",
        department: "Engineering",
        purpose: "Client Visit",
        date: "May 22, 2025",
        time: "10:00 AM - 2:00 PM",
        passengers: 8,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-003",
        requester: "Robert Smith",
        department: "Executive",
        purpose: "Downtown Meeting",
        date: "May 25, 2025",
        time: "9:00 AM - 11:00 AM",
        passengers: 4,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-004",
        requester: "Emily Chen",
        department: "HR",
        purpose: "Training Session",
        date: "May 18, 2025",
        time: "1:00 PM - 4:00 PM",
        passengers: 12,
        status: "approved",
        assignedVehicle: "BUS-103",
    },
    {
        id: "REQ-005",
        requester: "Michael Brown",
        department: "Sales",
        purpose: "Product Demo",
        date: "May 15, 2025",
        time: "9:00 AM - 12:00 PM",
        passengers: 6,
        status: "rejected",
        assignedVehicle: null,
    },
    {
        id: "REQ-006",
        requester: "John Doe",
        department: "Marketing",
        purpose: "Company Outing",
        date: "May 20, 2025",
        time: "8:00 AM - 5:00 PM",
        passengers: 30,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-007",
        requester: "Alice Johnson",
        department: "Engineering",
        purpose: "Client Visit",
        date: "May 22, 2025",
        time: "10:00 AM - 2:00 PM",
        passengers: 8,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-008",
        requester: "Robert Smith",
        department: "Executive",
        purpose: "Downtown Meeting",
        date: "May 25, 2025",
        time: "9:00 AM - 11:00 AM",
        passengers: 4,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-009",
        requester: "Emily Chen",
        department: "HR",
        purpose: "Training Session",
        date: "May 18, 2025",
        time: "1:00 PM - 4:00 PM",
        passengers: 12,
        status: "approved",
        assignedVehicle: "BUS-103",
    },
    {
        id: "REQ-010",
        requester: "Michael Brown",
        department: "Sales",
        purpose: "Product Demo",
        date: "May 15, 2025",
        time: "9:00 AM - 12:00 PM",
        passengers: 6,
        status: "rejected",
        assignedVehicle: null,
    },
    {
        id: "REQ-011",
        requester: "John Doe",
        department: "Marketing",
        purpose: "Company Outing",
        date: "May 20, 2025",
        time: "8:00 AM - 5:00 PM",
        passengers: 30,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-012",
        requester: "Alice Johnson",
        department: "Engineering",
        purpose: "Client Visit",
        date: "May 22, 2025",
        time: "10:00 AM - 2:00 PM",
        passengers: 8,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-013",
        requester: "Robert Smith",
        department: "Executive",
        purpose: "Downtown Meeting",
        date: "May 25, 2025",
        time: "9:00 AM - 11:00 AM",
        passengers: 4,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-014",
        requester: "Emily Chen",
        department: "HR",
        purpose: "Training Session",
        date: "May 18, 2025",
        time: "1:00 PM - 4:00 PM",
        passengers: 12,
        status: "approved",
        assignedVehicle: "BUS-103",
    },
    {
        id: "REQ-015",
        requester: "Michael Brown",
        department: "Sales",
        purpose: "Product Demo",
        date: "May 15, 2025",
        time: "9:00 AM - 12:00 PM",
        passengers: 6,
        status: "rejected",
        assignedVehicle: null,
    },
    {
        id: "REQ-016",
        requester: "John Doe",
        department: "Marketing",
        purpose: "Company Outing",
        date: "May 20, 2025",
        time: "8:00 AM - 5:00 PM",
        passengers: 30,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-017",
        requester: "Alice Johnson",
        department: "Engineering",
        purpose: "Client Visit",
        date: "May 22, 2025",
        time: "10:00 AM - 2:00 PM",
        passengers: 8,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-018",
        requester: "Robert Smith",
        department: "Executive",
        purpose: "Downtown Meeting",
        date: "May 25, 2025",
        time: "9:00 AM - 11:00 AM",
        passengers: 4,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-019",
        requester: "Emily Chen",
        department: "HR",
        purpose: "Training Session",
        date: "May 18, 2025",
        time: "1:00 PM - 4:00 PM",
        passengers: 12,
        status: "approved",
        assignedVehicle: "BUS-103",
    },
    {
        id: "REQ-020",
        requester: "Michael Brown",
        department: "Sales",
        purpose: "Product Demo",
        date: "May 15, 2025",
        time: "9:00 AM - 12:00 PM",
        passengers: 6,
        status: "rejected",
        assignedVehicle: null,
    },
    {
        id: "REQ-021",
        requester: "John Doe",
        department: "Marketing",
        purpose: "Company Outing",
        date: "May 20, 2025",
        time: "8:00 AM - 5:00 PM",
        passengers: 30,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-022",
        requester: "Alice Johnson",
        department: "Engineering",
        purpose: "Client Visit",
        date: "May 22, 2025",
        time: "10:00 AM - 2:00 PM",
        passengers: 8,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-023",
        requester: "Robert Smith",
        department: "Executive",
        purpose: "Downtown Meeting",
        date: "May 25, 2025",
        time: "9:00 AM - 11:00 AM",
        passengers: 4,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-024",
        requester: "Emily Chen",
        department: "HR",
        purpose: "Training Session",
        date: "May 18, 2025",
        time: "1:00 PM - 4:00 PM",
        passengers: 12,
        status: "approved",
        assignedVehicle: "BUS-103",
    },
    {
        id: "REQ-025",
        requester: "Michael Brown",
        department: "Sales",
        purpose: "Product Demo",
        date: "May 15, 2025",
        time: "9:00 AM - 12:00 PM",
        passengers: 6,
        status: "rejected",
        assignedVehicle: null,
    },
    {
        id: "REQ-026",
        requester: "John Doe",
        department: "Marketing",
        purpose: "Company Outing",
        date: "May 20, 2025",
        time: "8:00 AM - 5:00 PM",
        passengers: 30,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-027",
        requester: "Alice Johnson",
        department: "Engineering",
        purpose: "Client Visit",
        date: "May 22, 2025",
        time: "10:00 AM - 2:00 PM",
        passengers: 8,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-028",
        requester: "Robert Smith",
        department: "Executive",
        purpose: "Downtown Meeting",
        date: "May 25, 2025",
        time: "9:00 AM - 11:00 AM",
        passengers: 4,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-029",
        requester: "Emily Chen",
        department: "HR",
        purpose: "Training Session",
        date: "May 18, 2025",
        time: "1:00 PM - 4:00 PM",
        passengers: 12,
        status: "approved",
        assignedVehicle: "BUS-103",
    },
    {
        id: "REQ-030",
        requester: "Michael Brown",
        department: "Sales",
        purpose: "Product Demo",
        date: "May 15, 2025",
        time: "9:00 AM - 12:00 PM",
        passengers: 6,
        status: "rejected",
        assignedVehicle: null,
    },
    {
        id: "REQ-031",
        requester: "John Doe",
        department: "Marketing",
        purpose: "Company Outing",
        date: "May 20, 2025",
        time: "8:00 AM - 5:00 PM",
        passengers: 30,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-032",
        requester: "Alice Johnson",
        department: "Engineering",
        purpose: "Client Visit",
        date: "May 22, 2025",
        time: "10:00 AM - 2:00 PM",
        passengers: 8,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-033",
        requester: "Robert Smith",
        department: "Executive",
        purpose: "Downtown Meeting",
        date: "May 25, 2025",
        time: "9:00 AM - 11:00 AM",
        passengers: 4,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-034",
        requester: "Emily Chen",
        department: "HR",
        purpose: "Training Session",
        date: "May 18, 2025",
        time: "1:00 PM - 4:00 PM",
        passengers: 12,
        status: "approved",
        assignedVehicle: "BUS-103",
    },
    {
        id: "REQ-035",
        requester: "Michael Brown",
        department: "Sales",
        purpose: "Product Demo",
        date: "May 15, 2025",
        time: "9:00 AM - 12:00 PM",
        passengers: 6,
        status: "rejected",
        assignedVehicle: null,
    },
    {
        id: "REQ-036",
        requester: "John Doe",
        department: "Marketing",
        purpose: "Company Outing",
        date: "May 20, 2025",
        time: "8:00 AM - 5:00 PM",
        passengers: 30,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-037",
        requester: "Alice Johnson",
        department: "Engineering",
        purpose: "Client Visit",
        date: "May 22, 2025",
        time: "10:00 AM - 2:00 PM",
        passengers: 8,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-038",
        requester: "Robert Smith",
        department: "Executive",
        purpose: "Downtown Meeting",
        date: "May 25, 2025",
        time: "9:00 AM - 11:00 AM",
        passengers: 4,
        status: "pending",
        assignedVehicle: null,
    },
    {
        id: "REQ-039",
        requester: "Emily Chen",
        department: "HR",
        purpose: "Training Session",
        date: "May 18, 2025",
        time: "1:00 PM - 4:00 PM",
        passengers: 12,
        status: "approved",
        assignedVehicle: "BUS-103",
    },
    {
        id: "REQ-040",
        requester: "Michael Brown",
        department: "Sales",
        purpose: "Product Demo",
        date: "May 15, 2025",
        time: "9:00 AM - 12:00 PM",
        passengers: 6,
        status: "rejected",
        assignedVehicle: null,
    },
];

// Mock users for search
export const mockUsers = [
    {
        id: "u101",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        designation: "Manager",
    },
    {
        id: "u102",
        name: "Sam Williams",
        email: "sam.williams@example.com",
        designation: "Supervisor",
    },
    {
        id: "u103",
        name: "Jordan Smith",
        email: "jordan.smith@example.com",
        designation: "Staff",
    },
    {
        id: "u104",
        name: "Casey Brown",
        email: "casey.brown@example.com",
        designation: "Administrator",
    },
    {
        id: "u105",
        name: "Taylor Davis",
        email: "taylor.davis@example.com",
        designation: "Coordinator",
    },
    {
        id: "u106",
        name: "Morgan Wilson",
        email: "morgan.wilson@example.com",
        designation: "Analyst",
    },
    {
        id: "u107",
        name: "Riley Martinez",
        email: "riley.martinez@example.com",
        designation: "Specialist",
    },
    {
        id: "u108",
        name: "Jamie Taylor",
        email: "jamie.taylor@example.com",
        designation: "Director",
    },
    {
        id: "u109",
        name: "Quinn Anderson",
        email: "quinn.anderson@example.com",
        designation: "Assistant",
    },
    {
        id: "u110",
        name: "Avery Thomas",
        email: "avery.thomas@example.com",
        designation: "Technician",
    },
];

// Function to search users
export const searchUsers = (query: string) => {
    if (!query) return [];

    const lowerQuery = query.toLowerCase();
    return mockUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(lowerQuery) ||
            user.email.toLowerCase().includes(lowerQuery)
    );
};
