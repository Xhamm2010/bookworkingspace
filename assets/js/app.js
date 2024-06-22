

document.addEventListener("DOMContentLoaded", () => {
    const individualDesksContainer = document.getElementById('individual-desks');
    const teamDesksContainer = document.getElementById('team-desks');
    
    // Create 10 individual desks
    for (let i = 1; i <= 10; i++) {
        const desk = document.createElement('div');
        desk.classList.add('desk');
        desk.dataset.id = i;
        desk.dataset.type = 'individual';
        desk.textContent = `I${i}`;
        individualDesksContainer.appendChild(desk);
    }
    
    // Create 5 team desks
    for (let i = 1; i <= 5; i++) {
        const desk = document.createElement('div');
        desk.classList.add('desk');
        desk.dataset.id = i + 10;
        desk.dataset.type = 'team';
        desk.textContent = `T${i}`;
        teamDesksContainer.appendChild(desk);
    }
});
