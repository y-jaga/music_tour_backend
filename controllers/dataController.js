const {
  afterParties: afterPartiesModel,
  concert: concertModel,
  merchandiseStalls: merchandiseStallsModel,
  tour: tourModel,
  tourItem: tourItemModel,
} = require("../models");

const createTour = async (req, res) => {
  try {
    const { name, concerts, merchandiseStalls, afterParties } = req.body;

    const newTour = await tourModel.create({ name });

    if (concerts && concerts.length > 0) {
      for (const concert of concerts) {
        const savedConcert = await concertModel.create(concert);

        await tourItemModel.create({
          tourId: newTour.id,
          itemId: savedConcert.id,
          type: "concert",
        });
      }
    }

    if (merchandiseStalls && merchandiseStalls.length > 0) {
      for (const merchandiseStall of merchandiseStalls) {
        const savedMerchandiseStalls = await merchandiseStallsModel.create(
          merchandiseStall
        );

        await tourItemModel.create({
          tourId: newTour.id,
          itemId: savedMerchandiseStalls.id,
          type: "merchandiseStall",
        });
      }
    }

    if (afterParties && afterParties.length > 0) {
      for (const afterParty of afterParties) {
        const savedAfterParties = await afterPartiesModel.create(afterParty);

        await tourItemModel.create({
          tourId: newTour.id,
          itemId: savedAfterParties.id,
          type: "afterParty",
        });
      }
    }

    res.status(201).json({ message: "Tour created", tour: newTour });
  } catch (error) {
    res.status(500).json({ error: "Failed to create tour." });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await tourModel.findByPk(req.params.id);

    if (!tour) {
      return res.status(404).json({ error: "tour not found." });
    }

    const items = await tourItemModel.findAll({
      where: { tourId: tour.id },
    });

    const concerts = [];
    const merchandiseStalls = [];
    const afterParties = [];

    for (const item of items) {
      if (item.type === "concert") {
        const concertItem = await concertModel.findByPk(item.itemId);

        if (concertItem) { 
          concerts.push(concertItem);
        }
      } 
      else if (item.type === "merchandiseStall") {
        const merchandiseStallItem = await merchandiseStallsModel.findByPk(
          item.itemId
        );

        if (merchandiseStallItem) {
          merchandiseStalls.push(merchandiseStallItem);
        }
      } 
      else if (item.type === "afterParty") {
        const afterPartyItem = await afterPartiesModel.findByPk(item.itemId);

        if (afterPartyItem) { 
          afterParties.push(afterPartyItem);
        }
      }
    }

    res.json({
      tour,
      concerts,
      merchandiseStalls,
      afterParties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve tour" });
  }
};

module.exports = { createTour, getTour };
