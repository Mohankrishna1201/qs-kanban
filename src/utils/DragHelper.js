const data = {
    tickets: [
        {
            id: 1,
            title: "Update User Profile Page UI",
            tag: ["Feature Request"],
            userId: 1,
            status: "Todo",
            priority: 4,
        },
        {
            id: 2,
            title: "Add Multi-Language Support",
            tag: ["Feature Request"],
            userId: 2,
            status: "In progress",
            priority: 3,
        },
        {
            id: 3,
            title: "Optimize Database Queries for Performance",
            tag: ["Feature Request"],
            userId: 2,
            status: "In progress",
            priority: 1,
        },
        {
            id: 4,
            title: "Implement Email Notification System",
            tag: ["Feature Request"],
            userId: 1,
            status: "In progress",
            priority: 3,
        },
        {
            id: 5,
            title: "Enhance Search Functionality",
            tag: ["Feature Request"],
            userId: 5,
            status: "In progress",
            priority: 0,
        },
        {
            id: 6,
            title: "Third-Party Payment Gateway",
            tag: ["Feature Request"],
            userId: 2,
            status: "Todo",
            priority: 1,
        },
        {
            id: 7,
            title: "Create Onboarding Tutorial for New Users",
            tag: ["Feature Request"],
            userId: 1,
            status: "Backlog",
            priority: 2,
        },
        {
            id: 8,
            title: "Implement Role-Based Access Control (RBAC)",
            tag: ["Feature Request"],
            userId: 3,
            status: "In progress",
            priority: 3,
        },
        {
            id: 9,
            title: "Upgrade Server Infrastructure",
            tag: ["Feature Request"],
            userId: 5,
            status: "Todo",
            priority: 2,
        },
        {
            id: 10,
            title: "Conduct Security Vulnerability Assessment",
            tag: ["Feature Request"],
            userId: 4,
            status: "Backlog",
            priority: 1,
        },
    ],
    users: [
        { id: 1, name: "Anoop Sharma", available: false },
        { id: 2, name: "Yogesh", available: true },
        { id: 3, name: "Shankar Kumar", available: true },
        { id: 4, name: "Ramesh", available: true },
        { id: 5, name: "Suresh", available: true },
    ],
};

export const groupTicketsByStatus = (tickets) => {
    const groups = {};
    tickets.forEach((ticket) => {
        if (!groups[ticket.status]) {
            groups[ticket.status] = [];
        }
        groups[ticket.status].push(ticket);
    });
    return Object.entries(groups); // Convert the object into an array of [status, tickets]
};
export const groupTicketsByUsers = (tickets) => {
    const groups = {};
    tickets.forEach((ticket) => {
        if (!groups[ticket.userId]) {
            groups[ticket.userId] = [];
        }
        groups[ticket.userId].push(ticket);
    });
    return Object.entries(groups); // Convert the object into an array of [userId, tickets]
};

export const groupTicketsByPriority = (tickets) => {
    const groups = {};
    tickets.forEach((ticket) => {
        if (!groups[ticket.priority]) {
            groups[ticket.priority] = [];
        }
        groups[ticket.priority].push(ticket);
    });
    return Object.entries(groups); // Convert the object into an array of [priority, tickets]
};

const groupedByUsers = groupTicketsByUsers(data.tickets);
console.log("Grouped by Users:", groupedByUsers);

const groupedByPriority = groupTicketsByPriority(data.tickets);
console.log("Grouped by Priority:", groupedByPriority);

export const users = data.users;
export const tickets = data.tickets;


export default data;
