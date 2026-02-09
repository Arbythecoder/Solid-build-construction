# 📡 NEW API ENDPOINTS

**Added in this update**: Deal Sealing Flow + Enhanced RBAC

---

## 🆕 Deal Endpoints

### POST /api/deals
**Create New Deal**

**Auth**: Required (tenant, investor, agent)

**Request**:
```json
{
  "propertyId": "507f1f77bcf86cd799439011",
  "amount": 50000000,
  "dealType": "sale",
  "paymentPlan": {
    "type": "installment",
    "installments": [
      {
        "amount": 10000000,
        "dueDate": "2025-02-01"
      },
      {
        "amount": 40000000,
        "dueDate": "2025-03-01"
      }
    ]
  },
  "notes": "Interested in immediate purchase"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "property": { 
      "_id": "507f1f77bcf86cd799439011",
      "title": "Luxury 5-Bedroom Duplex"
    },
    "buyer": {
      "_id": "user123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "landlord": {
      "_id": "user456",
      "name": "Jane Smith"
    },
    "dealType": "sale",
    "status": "pending",
    "amount": 50000000,
    "paymentPlan": { ... },
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

**Errors**:
- 404: Property not found
- 400: Property not approved
- 400: Active deal already exists for this property

---

### GET /api/deals
**Get My Deals**

**Auth**: Required (any role)

**Query Params**:
```
status=pending        (optional: filter by status)
dealType=sale         (optional: filter by type)
```

**Response** (200 OK):
```json
{
  "success": true,
  "stats": {
    "pending": 3,
    "confirmed": 2,
    "completed": 5,
    "cancelled": 1
  },
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "property": {
        "title": "Luxury 5-Bedroom Duplex",
        "location": "Lekki, Lagos"
      },
      "status": "pending",
      "amount": 50000000,
      "dealType": "sale",
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

**Note**: 
- Landlords see deals where they are the seller
- Tenants/investors see deals where they are the buyer
- Admins see all deals

---

### GET /api/deals/:id
**Get Deal Details**

**Auth**: Required (buyer, landlord, or admin)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "property": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Luxury 5-Bedroom Duplex",
      "price": 50000000,
      "images": [...]
    },
    "buyer": {
      "_id": "user123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+234..."
    },
    "landlord": {
      "_id": "user456",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+234..."
    },
    "status": "confirmed",
    "amount": 50000000,
    "dealType": "sale",
    "paymentPlan": {
      "type": "installment",
      "installments": [...]
    },
    "confirmedAt": "2025-01-16T14:30:00Z",
    "notes": "Interested in immediate purchase",
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-16T14:30:00Z"
  }
}
```

**Errors**:
- 404: Deal not found
- 403: Not authorized to access this deal

---

### PUT /api/deals/:id/confirm
**Confirm Deal (Landlord Only)**

**Auth**: Required (landlord who owns the property, or admin)

**Request**: (empty body)

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Deal confirmed successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "status": "confirmed",
    "confirmedAt": "2025-01-16T14:30:00Z",
    ...
  }
}
```

**Errors**:
- 400: Deal already confirmed
- 400: Deal has been cancelled
- 403: Only landlord can confirm

**Side Effects**:
- Notification sent to buyer
- Deal status changes to 'confirmed'

---

### PUT /api/deals/:id/complete
**Complete Deal**

**Auth**: Required (buyer, landlord, or admin)

**Request**: (empty body)

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Deal completed successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "status": "completed",
    "completedAt": "2025-01-20T09:00:00Z",
    "property": {
      "status": "sold"  // or "rented"
    },
    ...
  }
}
```

**Errors**:
- 400: Deal must be confirmed first
- 400: Deal already completed
- 400: Deal has been cancelled

**Side Effects**:
- Property status updated to 'sold' or 'rented'
- Deal status changes to 'completed'
- Notifications sent to both parties

---

### PUT /api/deals/:id/cancel
**Cancel Deal**

**Auth**: Required (buyer, landlord, or admin)

**Request**:
```json
{
  "reason": "Found a better property"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Deal cancelled successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "status": "cancelled",
    "cancelledAt": "2025-01-17T16:00:00Z",
    "cancellationReason": "Found a better property",
    ...
  }
}
```

**Errors**:
- 400: Deal already cancelled
- 400: Cannot cancel completed deal
- 400: Cancellation reason is required

---

## 🔒 Enhanced RBAC on Existing Endpoints

### PUT /api/properties/:id
**Now enforces ownership**

**Before**: Any landlord could edit any property  
**After**: Only the property owner (or admin) can edit

**New Response**:
- 403: "You are not authorized to update this property"

---

### DELETE /api/properties/:id
**Now enforces ownership**

**Before**: Any landlord/admin could delete any property  
**After**: Only the property owner (or admin) can delete

**New Response**:
- 403: "You are not authorized to delete this property"

---

### GET /api/properties
**Now scopes results by role**

**Landlords**: Only see their own properties  
**Tenants/Investors**: Only see approved properties  
**Admins**: See all properties

**Query automatically filtered** - no code changes needed!

---

### GET /api/investor/investments
**Now scoped to current user**

**Before**: All investments returned  
**After**: Only current investor's investments returned

**Automatic filtering** based on JWT token.

---

## 🔐 RBAC Middleware Details

All protected endpoints now use these middleware:

### checkPropertyOwnership
```javascript
// Verifies user owns the property or is admin
// Used on: PUT/DELETE /api/properties/:id
```

### checkInvestmentOwnership
```javascript
// Verifies user owns the investment or is admin
// Used on: GET /api/investor/investments/:id
```

### checkDealAccess
```javascript
// Verifies user is buyer, landlord, or admin
// Used on: All /api/deals/:id routes
```

### scopePropertiesToRole
```javascript
// Automatically filters property queries by role
// Used on: GET /api/properties
```

---

## 📊 Deal Status Flow

```
pending → confirmed → completed
   ↓          ↓
cancelled  cancelled
```

**Status Transitions**:
- `pending`: Initial state when deal is created
- `confirmed`: Landlord accepted the offer
- `completed`: Payment received, property transferred
- `cancelled`: Deal cancelled by either party (cannot be completed after)

---

## 🧪 Testing Examples

### Test RBAC (Property Ownership)
```bash
# 1. Create property as landlord1
TOKEN1=$(curl -s http://localhost:5000/api/auth/login \
  -d '{"email":"landlord1@solidbuild.com","password":"Landlord@123"}' \
  -H "Content-Type: application/json" | jq -r '.token')

PROPERTY_ID=$(curl -s http://localhost:5000/api/properties \
  -H "Authorization: Bearer $TOKEN1" \
  -d '{"title":"Test Villa","price":50000000,...}' | jq -r '.data._id')

# 2. Try to edit as landlord2 (should fail)
TOKEN2=$(curl -s http://localhost:5000/api/auth/login \
  -d '{"email":"landlord2@solidbuild.com","password":"Landlord@123"}' | jq -r '.token')

curl -X PUT http://localhost:5000/api/properties/$PROPERTY_ID \
  -H "Authorization: Bearer $TOKEN2" \
  -d '{"title":"Hacked"}' \
  -H "Content-Type: application/json"
# Expected: 403 Forbidden
```

### Test Deal Flow
```bash
# 1. Tenant creates deal
TENANT_TOKEN=$(curl -s http://localhost:5000/api/auth/login \
  -d '{"email":"tenant@solidbuild.com","password":"Tenant@123"}' | jq -r '.token')

DEAL_ID=$(curl -s http://localhost:5000/api/deals \
  -H "Authorization: Bearer $TENANT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"propertyId":"'$PROPERTY_ID'","amount":50000000,"dealType":"sale"}' \
  | jq -r '.data._id')

# 2. Landlord confirms
curl -X PUT http://localhost:5000/api/deals/$DEAL_ID/confirm \
  -H "Authorization: Bearer $TOKEN1"
# Expected: 200 OK, status='confirmed'

# 3. Complete deal
curl -X PUT http://localhost:5000/api/deals/$DEAL_ID/complete \
  -H "Authorization: Bearer $TOKEN1"
# Expected: 200 OK, status='completed', property.status='sold'
```

---

## 📝 Notes

- All deal endpoints require authentication
- Deal access is restricted to involved parties only
- Property must be 'approved' before deals can be created
- Only one active deal per property at a time
- Completed deals cannot be modified
- Cancelled deals cannot be completed

---

**API Version**: 1.0  
**Base URL**: https://your-backend-url.com/api  
**Authentication**: Bearer JWT token  
**Last Updated**: January 2025
