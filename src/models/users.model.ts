import { usertype } from "@/types/users.type";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<usertype>({
    profile_info: {
        fullname: {
            type: String,
            required: [true, "fullname is required."],
            trim: true,
            minlength: [3, "name should atleat 3 character long."]
        },
        username: {
            type: String,
            unique: [true, "username should be unique."],
            trim: true,
            lowercase: true,
            index: true
        },
        email: {
            type: String,
            unique: [true, "email address already exist."],
            required: [true, "email is required."],
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "password is required."],
        },
        profile_img: {
            publicId: {
                type: String,
            },
            url: {
                type: String,
                default: "https://img.freepik.com/premium-photo/3d-character-avatar_113255-5314.jpg?w=740",
            }
        },
        cover_img: {
            publicId: {
                type: String,
            },
            url: {
                type: String,
            }
        },
        bio: {
            type: String,
            trim: true,
            default: "Hello, I'm a new user.",
            maxlength: [500, "Bio should not be more than 500 characters"],
        }
    },
    account_info: {
        total_posts: {
            type: Number,
            default: 0
        },
        total_likes: {
            type: Number,
            default: 0
        },
        toatal_reads: {
            type: Number,
            default: 0
        }
    },
    social_links: {
        instagram: {
            type: String,
            default: ""
        },
        youtube: {
            type: String,
            default: ""
        },
        facebook: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        },
        github: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        }
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    verification_code: {
        type: Number,
        required: [true, "verification code required."]
    },
    verification_code_expiry: {
        type: Date,
        default: Date.now() + 3600000
    },
    is_published: {
        type: Boolean,
        default: false
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "posts",
            default: []
        }
    ]
}, { timestamps: true });

export const Users = mongoose.models.users<usertype> || mongoose.model<usertype>("users", userSchema);