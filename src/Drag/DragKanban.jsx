import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "../components/Card";
import plus from "../utils/icons_FEtask/add.svg";
import dot from "../utils/icons_FEtask/3 dot menu.svg";
import User from "../components/User";
import { getStatusIcon, getPriorityIcon, getPriorityText, getStatusText } from '../utils/helper';

// Sortable Card Component
function SortableCard({ ticket, user }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: ticket.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card
                id={ticket.id}
                title={ticket.title}
                tag={ticket.tag}
                name={user?.name || "Unassigned"}
                priority={ticket.priority}
                status={ticket.status}
            />
        </div>
    );
}

// Kanban Status Group
function KanbanGroup({ group, tickets, users, gU, gP, gS }) {
    console.log(gU);
    console.log(users);
    return (

        <div className="statusGroup" key={group}>
            {gU && (
                <div className="big-div">
                    <div className="start-group">

                        {(() => {
                            const user = users.find((user) => user.id === Number(group));
                            return user ? (
                                <>
                                    <User name={user.name} available={user.available} />
                                    {user.name}
                                </>
                            ) : (
                                "Unknown User"
                            );
                        })()}
                        <p>{tickets.length}</p>
                    </div>
                    <div className="end-group">
                        <img src={plus} alt="Add" />
                        <img src={dot} alt="Options" />
                    </div>
                </div>
            )}


            {gP && (

                <div className="big-div">
                    <div className="start-group">
                        {getPriorityIcon(Number(group))}
                        {getPriorityText(Number(group))}
                        <p>{tickets.length}</p>
                    </div>
                    <div className="end-group">
                        <img src={plus} alt="Add" />
                        <img src={dot} alt="Options" />
                    </div>
                </div>
            )}


            {gS && (
                <div className="big-div">
                    <div className="start-group">
                        {getStatusIcon(String(group))}
                        {getStatusText(String(group))}
                        <p>{tickets.length}</p>
                    </div>
                    <div className="end-group">
                        <img src={plus} alt="Add" />
                        <img src={dot} alt="Options" />
                    </div>
                </div>
            )}

            <div className="cardContainer">
                <SortableContext items={tickets.map((ticket) => ticket.id)} strategy={verticalListSortingStrategy}>
                    {tickets.map((ticket) => {
                        const user = Array.isArray(users) ? users.find((u) => u.id === ticket.userId) : null;
                        return <SortableCard key={ticket.id} ticket={ticket} user={user} />;
                    })}
                </SortableContext>
            </div>
        </div>
    );
}


export default function DragKanban({ passTickets, users, gU, gP, gS }) {
    console.log(passTickets);

    const [displayTickets, setDisplayTickets] = useState(passTickets);
    const [userList, setUsers] = useState(users);
    console.log(displayTickets);
    useEffect(() => {
        setDisplayTickets(passTickets);
    }, [passTickets]);
    const onDragEnd = ({ active, over }) => {
        if (!over) return; // No valid drop target

        const activeId = active.id;
        const overId = over.id;

        // Find the source and destination groups
        const sourceGroupIndex = displayTickets.findIndex(([group, tickets]) =>
            tickets.some((ticket) => ticket.id === activeId)
        );
        const destinationGroupIndex = displayTickets.findIndex(([group, tickets]) =>
            tickets.some((ticket) => ticket.id === overId)
        );

        if (sourceGroupIndex === -1 || destinationGroupIndex === -1) return;

        const [sourceGroup, sourceTickets] = displayTickets[sourceGroupIndex];
        const [destinationGroup, destinationTickets] = displayTickets[destinationGroupIndex];

        if (sourceGroupIndex === destinationGroupIndex) {
            // Reorder within the same group
            const updatedTickets = arrayMove(
                sourceTickets,
                sourceTickets.findIndex((ticket) => ticket.id === activeId),
                sourceTickets.findIndex((ticket) => ticket.id === overId)
            );
            const updatedGroups = [...displayTickets];
            updatedGroups[sourceGroupIndex] = [sourceGroup, updatedTickets];
            setDisplayTickets(updatedGroups);
        } else {
            // Move between groups
            const activeTicketIndex = sourceTickets.findIndex((ticket) => ticket.id === activeId);
            const [movedTicket] = sourceTickets.splice(activeTicketIndex, 1);

            // Update the moved ticket's status to the new group
            movedTicket.status = destinationGroup;

            destinationTickets.push(movedTicket);

            const updatedGroups = [...displayTickets];
            updatedGroups[sourceGroupIndex] = [sourceGroup, sourceTickets];
            updatedGroups[destinationGroupIndex] = [destinationGroup, destinationTickets];
            setDisplayTickets(updatedGroups);
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <div className="statusPage">
                {displayTickets.length === 0 && <p>No tickets to display</p>}
                {displayTickets.map(([group, tickets]) => (
                    <KanbanGroup key={group} group={group} tickets={tickets} users={userList} gU={gU} gP={gP} gS={gS} />
                ))}
            </div>
        </DndContext>
    );
}

