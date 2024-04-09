import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
});

CategorySchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (_, ret) {
        delete ret._id;
    }
});

export const CategoryModel = mongoose.model("Category", CategorySchema);
