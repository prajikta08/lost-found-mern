const express = require("express");
const router = express.Router();

const Item = require("../models/Item");
const User = require("../models/User");

const isLoggedIn =
require("../middleware/isLoggedIn");

const upload =
require("../config/multer");

const Claim =
require("../models/Claim");

router.post(
    "/items",
    isLoggedIn,
    upload.single("image"),
    async (req, res) => {
        try {
            const item =
            await Item.create({
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                location: req.body.location,
                type: req.body.type,
                image:
                    req.file ? req.file.filename : null,
                owner: req.user.id
            });

            const user =
            await User.findById(
                req.user.id
            );

            user.lostItems.push(
                item._id
            );

            await user.save();

            res.status(201).json(item);

        } catch (err) {

            console.log(err);

            res.status(500).send(
                "Failed to create item"
            );
        }
    }
);

router.get("/items", async (req, res) => {
    try {
        const items = await Item.find()
            .populate("owner", "username email");

        res.json(items);

    } catch(err) {
        console.log(err);
        res.status(500).send("Failed to fetch items");
    }
});

router.get(
    "/items/:id",
    async (req, res) => {
        try {

            const item =
            await Item.findById(
                req.params.id
            )
            .populate(
                "owner",
                "username email"
            );

            if (!item) {

                return res.status(404)
                .send("Item not found");
            }

            res.json(item);

        } catch (err) {

            console.log(err);

            res.status(500).send(
                "Failed to fetch item"
            );
        }
    }
);

router.delete(
    "/items/:id",
    isLoggedIn,
    async (req, res) => {

        try {

            const item =
            await Item.findById(
                req.params.id
            );

            if (!item) {

                return res.status(404)
                .send("Item not found");
            }

            if (
                item.owner.toString() !==
                req.user.id
            ) {

                return res.status(403).json({
    message: "Not authorized"
});
            }

            await Item.findByIdAndDelete(
                req.params.id
            );

            await User.findByIdAndUpdate(
                req.user.id,
            {
            $pull: {
            lostItems: item._id
            }
            }
);

            res.json({
    message: "Item deleted"
});

        } catch (err) {

            console.log(err);

            res.status(500).send(
                "Failed to delete item"
            );
        }
    }
);

router.get(
    "/profile",
    isLoggedIn,
    async (req, res) => {

        try {

            const user =
            await User.findById(
                req.user.id
            )
            .select("-password")
            .populate("lostItems");

            if (!user) {
                return res.status(404)
                .send("User not found");
            }

            res.json(user);

        } catch (err) {

            console.log(err);

            res.status(500).send(
                "Something went wrong"
            );
        }
    }
);

router.get(
    "/my-items",
    isLoggedIn,
    async (req, res) => {

        try {

            const items =
            await Item.find({
                owner: req.user.id
            });

            res.json(items);

        } catch (err) {

            console.log(err);

            res.status(500).send(
                "Failed to fetch items"
            );
        }
    }
);

//router.get("/items/:id/edit", //isLoggedIn, async (req,res) => {
//    const item = await Item.findById//(req.params.id)
//   res.json(item);
//})

router.put(
    "/items/:id",
    isLoggedIn,
    async (req,res) => {

        try {

            const item =
            await Item.findById(
                req.params.id
            );

            if(!item){
                return res.status(404).json({
                    message: "Item not found"
                });
            }

            if(
                item.owner.toString() !==
                req.user.id
            ){
                return res.status(403).json({
                    message: "Not authorized"
                });
            }

            await Item.findByIdAndUpdate(
                req.params.id,
                {
                    title: req.body.title,
                    category: req.body.category,
                    location: req.body.location,
                    description: req.body.description
                }
            );

            res.json({
                message: "Item updated"
            });

        } catch(err){

            console.log(err);

            res.status(500).json({
                message: "Failed to update item"
            });

        }
});

router.get(
    "/items/:id/claim",
    isLoggedIn,
    async (req,res)=>{

        const item =
        await Item.findById(
            req.params.id
        );

       res.json(item);
});

router.post(
"/items/:id/claim",

isLoggedIn,

async (req,res)=>{

    await Claim.create({

        item:
        req.params.id,

        claimant:
        req.user.id,

        message:
        req.body.message

    });

    //prevent users from claiming their own items
    const item = await Item.findById(req.params.id);
    if(items.owner.toString() == req.user.id){
        return res.status(400).json({
            message: "You cannot claim your own item"
        })
    }

    res.status(201).json({
    message: "Claim submitted"
});

});

router.get(
    "/claims",
    isLoggedIn,
    async (req,res)=>{

        const claims =
        await Claim.find()
        .populate("item")
        .populate(
            "claimant",
            "username email"
        );

        const myClaims =
        claims.filter(
            claim =>
            claim.item.owner
            .toString()
            ===
            req.user.id
        );

       res.json(myClaims);
});

router.post(
    "/claims/:id/approve",
    isLoggedIn,
    async (req,res)=>{

        const claim =
        await Claim.findById(
            req.params.id
        )
        .populate("item");

        if(
            claim.item.owner.toString()
            !==
            req.user.id
        ){
            return res.status(403).json({
    message: "Not authorized"
});
        }

        claim.status =
        "approved";

        await claim.save();

        claim.item.status = "resolved";
await claim.item.save();

        res.json({
    message: "Claim approved"
    });
});
router.post(
    "/claims/:id/reject",
    isLoggedIn,
    async (req,res)=>{

        const claim =
        await Claim.findById(
            req.params.id
        )
        .populate("item");

        if(
            claim.item.owner.toString()
            !==
            req.user.id
        ){
            return res.status(403).json({
    message: "Not authorized"
});
        }

        claim.status =
        "rejected";

        await claim.save();

        res.json({
    message: "Claim rejected"
});
});

//API to check existing claim

router.get(
  "/items/:id/my-claim",
  isLoggedIn,
  async (req, res) => {

    const claim = await Claim.findOne({
      item: req.params.id,
      claimant: req.user.id
    });

    res.json({
      claimed: !!claim
    });
});

module.exports = router;