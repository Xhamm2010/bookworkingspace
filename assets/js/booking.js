let bookings = [];

const prices = {
    basic: 10,
    premium: 15,
    executive: 20,
    team: 25
};

// Handle the form submission for booking a desk
document.getElementById('booking-form').addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the values from the form fields
    const deskType = document.getElementById('desk-type').value;
    const deskId = parseInt(document.getElementById('desk-id').value);
    const membershipTier = document.getElementById('membership-tier').value;
    const hours = parseInt(document.getElementById('hours').value);

    // Debug logs
    console.log('Desk Type:', deskType);
    console.log('Desk ID:', deskId);

    // Validate the booking
    let desk;
    if (deskType === 'individual') {
        desk = document.querySelector(`.desk[data-id="${deskId}"][data-type="individual"]`);
    } else if (deskType === 'team') {
        desk = document.querySelector(`.desk[data-id="${deskId}"][data-type="team"]`);
    }

    if (!desk || desk.classList.contains('booked')) {
        alert('Invalid desk selection or desk already booked.');
        return;
    }

    // Calculate the price for the booking
    let pricePerHour = deskType === 'team' ? prices.team : prices[membershipTier];
    let totalPrice = pricePerHour * hours;

    // Apply a 10% discount if booking is for more than 3 hours
    if (hours > 3) {
        totalPrice *= 0.9;
    }

    // Mark the desk as booked
    desk.classList.add('booked');

    // Add the booking to the array
    bookings.push({
        deskId,
        deskType,
        membershipTier,
        hours,
        totalPrice
    });

    // Display the booking result to the user
    document.getElementById('booking-result').textContent = `Desk booked successfully! Total charged: $${totalPrice.toFixed(2)}`;

    // Update the revenue dashboard
    updateDashboard();
});

// Function to update the revenue dashboard
function updateDashboard() {
    // Object to keep track of revenue for each tier
    const revenueByTier = {
        basic: 0,
        premium: 0,
        executive: 0,
        team: 0
    };

    // Calculate the total revenue for each tier
    bookings.forEach(booking => {
        // If the desk type is 'team', add to the team revenue, otherwise add to the appropriate membership tier
        revenueByTier[booking.deskType === 'team' ? 'team' : booking.membershipTier] += booking.totalPrice;
    });

    // Display the revenue dashboard
    document.getElementById('revenue-dashboard').innerHTML = `
        <p>Basic: $${revenueByTier.basic.toFixed(2)}</p>
        <p>Premium: $${revenueByTier.premium.toFixed(2)}</p>
        <p>Executive: $${revenueByTier.executive.toFixed(2)}</p>
        <p>Team: $${revenueByTier.team.toFixed(2)}</p>
        <p>Total: $${(revenueByTier.basic + revenueByTier.premium + revenueByTier.executive + revenueByTier.team).toFixed(2)}</p>
    `;
}