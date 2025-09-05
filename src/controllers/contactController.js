import Contact from "../models/Contact.js";

const listContacts = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { q, type } = req.query;
    const filters = { businessId };
    if (q) filters.name = { $regex: q, $options: "i" };
    if (type) filters.type = type;
    const contacts = await Contact.find(filters);
    return res.json({
      success: true,
      message: "Contacts fetched successfully",
      data: contacts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const createContact = async (req, res) => {
  try {
    const businessId = req.user.id;
    const payload = { ...req.body, businessId };
    if (!payload.name || !payload.type)
      return res
        .status(400)
        .json({ success: false, message: "name and type required" });
    const c = await Contact.create(payload);
    return res.json({
      success: true,
      message: "Contact created successfully",
      data: c,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateContact = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { id } = req.params;
    const contact = await Contact.findOneAndUpdate(
      { _id: id, businessId },
      req.body,
      { new: true }
    );
    if (!contact)
      return res.status(404).json({ success: false, message: "Not found" });
    return res.json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const businessId = req.user.id;
    const { id } = req.params;
    const contact = await Contact.findOneAndDelete({ _id: id, businessId });
    if (!contact)
      return res.status(404).json({ success: false, message: "Not found" });
    return res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { deleteContact, updateContact, createContact, listContacts };
