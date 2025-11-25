const propertyTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("PropertyType", propertyTypeSchema);