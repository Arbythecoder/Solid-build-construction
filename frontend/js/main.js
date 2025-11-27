(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top');
        } else {
            $('.nav-bar').removeClass('sticky-top');
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: { items: 1 },
            992: { items: 2 }
        }
    });
})(jQuery);


// ✅ Fetch and display property listings
async function fetchProperties() {
    try {
        // Get JWT token (if authentication is required)
        const token = localStorage.getItem("token");

        // Make API request
        const response = await fetch(`${API_URL}/properties`, {
            method: "GET",
            headers: token ? { "Authorization": `Bearer ${token}` } : {},
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const properties = await response.json();

        // Get containers
        const featuredContainer = document.getElementById("featured-properties");
        const forSaleContainer = document.getElementById("for-sale-properties"); // ✅ Changed from "For Sell"
        const forRentContainer = document.getElementById("for-rent-properties");

        // Clear existing content
        featuredContainer.innerHTML = "";
        forSaleContainer.innerHTML = "";
        forRentContainer.innerHTML = "";

        // Check if properties exist
        if (properties.length === 0) {
            featuredContainer.innerHTML = "<p>No properties available.</p>";
            return;
        }

        // Generate property HTML
        properties.forEach((property) => {
            const propertyHTML = `
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="property-item rounded overflow-hidden">
                        <div class="position-relative overflow-hidden">
                            <a href="#"><img class="img-fluid" src="${property.image}" alt="${property.title}"></a>
                            <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">${property.status}</div>
                            <div class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">${property.type}</div>
                        </div>
                        <div class="p-4 pb-0">
                            <h5 class="text-primary mb-3">$${property.price}</h5>
                            <a class="d-block h5 mb-2" href="#">${property.title}</a>
                            <p><i class="fa fa-map-marker-alt text-primary me-2"></i>${property.location}</p>
                        </div>
                        <div class="d-flex border-top">
                            <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined text-primary me-2"></i>${property.size} Sqft</small>
                            <small class="flex-fill text-center border-end py-2"><i class="fa fa-bed text-primary me-2"></i>${property.bedrooms} Bed</small>
                            <small class="flex-fill text-center py-2"><i class="fa fa-bath text-primary me-2"></i>${property.bathrooms} Bath</small>
                        </div>
                    </div>
                </div>
            `;

            // Append to the appropriate container
            if (property.category === "Featured") {
                featuredContainer.innerHTML += propertyHTML;
            } else if (property.category === "For Sale") { // ✅ Changed from "For Sell"
                forSaleContainer.innerHTML += propertyHTML;
            } else if (property.category === "For Rent") {
                forRentContainer.innerHTML += propertyHTML;
            }
        });
    } catch (error) {
        console.error("Error fetching properties:", error);
        document.getElementById("featured-properties").innerHTML = `<p style="color:red;">Failed to load properties. Try again later.</p>`;
    }
}

// ✅ Fetch properties when page loads
document.addEventListener("DOMContentLoaded", fetchProperties);
