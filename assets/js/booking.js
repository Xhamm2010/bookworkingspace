

let bookings = [];

const prices = {
    basic: 10,
    premium: 15,
    executive: 20,
    team: 25
};

document.getElementById('booking-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const deskType = document.getElementById('desk-type').value;
    const deskId = parseInt(document.getElementById('desk-id').value);
    const membershipTier = document.getElementById('membership-tier').value;
    const hours = parseInt(document.getElementById('hours').value);

    // Validate booking
    const desk = document.querySelector(`.desk[data-id="${deskId}"][data-type="${deskType}"]`);
    if (!desk || desk.classList.contains('booked')) {
        alert('Invalid desk selection or desk already booked.');
        return;
    }

    let pricePerHour = deskType === 'team' ? prices.team : prices[membershipTier];
    let totalPrice = pricePerHour * hours;

    if (hours > 3) {
        totalPrice *= 0.9; // Apply 10% discount
    }

    // Mark desk as booked
    desk.classList.add('booked');

    // Add booking
    bookings.push({
        deskId,
        deskType,
        membershipTier,
        hours,
        totalPrice
    });

    // Display booking result
    document.getElementById('booking-result').textContent = `Desk booked successfully! Total charged: $${totalPrice.toFixed(2)}`;

    // Update revenue dashboard
    updateDashboard();
});

function updateDashboard() {
    const revenueByTier = {
        basic: 0,
        premium: 0,
        executive: 0,
        team: 0
    };

    bookings.forEach(booking => {
        revenueByTier[booking.deskType === 'team' ? 'team' : booking.membershipTier] += booking.totalPrice;
    });

    document.getElementById('revenue-dashboard').innerHTML = `
        <p>Basic: $${revenueByTier.basic.toFixed(2)}</p>
        <p>Premium: $${revenueByTier.premium.toFixed(2)}</p>
        <p>Executive: $${revenueByTier.executive.toFixed(2)}</p>
        <p>Team: $${revenueByTier.team.toFixed(2)}</p>
        <p>Total: $${(revenueByTier.basic + revenueByTier.premium + revenueByTier.executive + revenueByTier.team).toFixed(2)}</p>
    `;
}
