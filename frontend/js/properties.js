// Properties API Helper
// API_URL is loaded from config.js - make sure config.js is loaded before this script

class PropertiesAPI {
    // Fetch all properties
    static async getAllProperties() {
        try {
            const response = await fetch(`${API_URL}/properties`);
            if (!response.ok) throw new Error('Failed to fetch properties');
            return await response.json();
        } catch (error) {
            console.error('Error fetching properties:', error);
            return [];
        }
    }

    // Fetch properties with filters
    static async getFilteredProperties(filters = {}) {
        try {
            const queryParams = new URLSearchParams();

            if (filters.status) queryParams.append('status', filters.status);
            if (filters.type) queryParams.append('type', filters.type);
            if (filters.location) queryParams.append('location', filters.location);
            if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
            if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
            if (filters.featured !== undefined) queryParams.append('featured', filters.featured);

            const response = await fetch(`${API_URL}/properties/filter?${queryParams}`);
            if (!response.ok) throw new Error('Failed to fetch filtered properties');
            return await response.json();
        } catch (error) {
            console.error('Error fetching filtered properties:', error);
            return [];
        }
    }

    // Fetch single property by ID
    static async getPropertyById(id) {
        try {
            const response = await fetch(`${API_URL}/properties/${id}`);
            if (!response.ok) throw new Error('Property not found');
            return await response.json();
        } catch (error) {
            console.error('Error fetching property:', error);
            return null;
        }
    }

    // Create property card HTML
    static createPropertyCard(property) {
        const imageSrc = property.images && property.images.length > 0
            ? property.images[0]
            : 'img/property-1.jpg'; // Default fallback image

        const formattedPrice = property.status === 'For Rent'
            ? `₦${property.price.toLocaleString()}/year`
            : `₦${property.price.toLocaleString()}`;

        const bedroomInfo = property.bedrooms > 0
            ? `${property.bedrooms} Bed`
            : 'N/A';

        const bathroomInfo = property.bathrooms > 0
            ? `${property.bathrooms} Bath`
            : 'N/A';

        const areaInfo = property.area
            ? `${property.area} ${property.areaUnit}`
            : 'N/A';

        return `
            <div class="col-lg-4 col-md-6">
                <div class="property-item rounded overflow-hidden">
                    <div class="position-relative overflow-hidden">
                        <a href="property-detail.html?id=${property._id}">
                            <img class="img-fluid" src="${imageSrc}" alt="${property.title}">
                        </a>
                        <div class="bg-warning rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                            ${property.status}
                        </div>
                        <div class="bg-white rounded-top text-warning position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                            ${property.type}
                        </div>
                    </div>
                    <div class="p-4 pb-0">
                        <h5 class="text-warning mb-3">${formattedPrice}</h5>
                        <a class="d-block h5 mb-2" href="property-detail.html?id=${property._id}">
                            ${property.title}
                        </a>
                        <p><i class="fa fa-map-marker-alt text-warning me-2"></i>${property.location}</p>
                    </div>
                    <div class="d-flex border-top">
                        <small class="flex-fill text-center border-end py-2">
                            <i class="fa fa-ruler-combined text-warning me-2"></i>${areaInfo}
                        </small>
                        <small class="flex-fill text-center border-end py-2">
                            <i class="fa fa-bed text-warning me-2"></i>${bedroomInfo}
                        </small>
                        <small class="flex-fill text-center py-2">
                            <i class="fa fa-bath text-warning me-2"></i>${bathroomInfo}
                        </small>
                    </div>
                </div>
            </div>
        `;
    }

    // Render properties to a container
    static renderProperties(properties, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        if (properties.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <h4>No properties found</h4>
                    <p class="text-muted">Please try adjusting your search criteria</p>
                </div>
            `;
            return;
        }

        container.innerHTML = properties.map(property =>
            this.createPropertyCard(property)
        ).join('');
    }

    // Load properties for index page
    static async loadIndexPageProperties() {
        // Load featured properties
        const featuredProperties = await this.getFilteredProperties({ featured: true });
        const featuredContainer = document.getElementById('featured-properties-container');
        if (featuredContainer) {
            this.renderProperties(featuredProperties.slice(0, 9), 'featured-properties-container');
        }

        // Load For Sale properties
        const forSaleProperties = await this.getFilteredProperties({ status: 'For Sale' });
        const forSaleContainer = document.getElementById('for-sale-properties-container');
        if (forSaleContainer) {
            this.renderProperties(forSaleProperties.slice(0, 6), 'for-sale-properties-container');
        }

        // Load For Rent properties
        const forRentProperties = await this.getFilteredProperties({ status: 'For Rent' });
        const forRentContainer = document.getElementById('for-rent-properties-container');
        if (forRentContainer) {
            this.renderProperties(forRentProperties.slice(0, 6), 'for-rent-properties-container');
        }
    }

    // Search properties
    static async searchProperties(keyword, propertyType, location) {
        try {
            const allProperties = await this.getAllProperties();

            return allProperties.filter(property => {
                const matchesKeyword = !keyword ||
                    property.title.toLowerCase().includes(keyword.toLowerCase()) ||
                    property.description?.toLowerCase().includes(keyword.toLowerCase());

                const matchesType = !propertyType || propertyType === 'Property Type' ||
                    property.type === propertyType;

                const matchesLocation = !location || location === 'Location' ||
                    property.location.toLowerCase().includes(location.toLowerCase());

                return matchesKeyword && matchesType && matchesLocation;
            });
        } catch (error) {
            console.error('Error searching properties:', error);
            return [];
        }
    }
}

// Initialize property loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page that needs property loading
    const featuredContainer = document.getElementById('featured-properties-container');
    if (featuredContainer) {
        PropertiesAPI.loadIndexPageProperties();
    }
});
