const {
  models: { TaskCard, Comment, User },
} = require("../db");
const UserBoard = require("../db/models/UserBoard");
const UserTaskCard = require("../db/models/UserTaskCard");
const router = require("express").Router();

// GET /api/tasks/:boardId
router.get("/:boardId", async (req, res, next) => {
  try {
    const tasks = await TaskCard.findAll({
      where: {
        boardId: req.params.boardId,
      },
      order: [["position", "ASC"]],
      include: {
        model: Comment,
        separate: true,
        order: [["createdAt", "DESC"]],
        include: [User],
      },
    });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks/:boardId
router.post("/:boardId", async (req, res, next) => {
  try {
    await TaskCard.create(req.body);
    const taskCard = await TaskCard.findOne({
      where: {
        boardId: req.body.boardId,
        listId: req.body.listId,
        title: req.body.title,
        position: req.body.position,
      },
      include: {
        model: Comment,
        separate: true,
        order: [["createdAt", "DESC"]],
        include: [User],
      },
    });
    res.status(200).json(taskCard);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:boardId/:taskCardId
router.put("/:boardId/:taskCardId", async (req, res, next) => {
  try {
    const taskCard = await TaskCard.findByPk(req.params.taskCardId, {
      include: {
        model: Comment,
        separate: true,
        order: [["createdAt", "DESC"]],
        include: [User],
      },
    });
    res.status(200).json(await taskCard.update(req.body));
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks/thisTask/:thisTaskCardId/thisUser/:userId
// If the taskcard doesn't exist, create it
// if it does exist, delete it
router.post(
  `/thisTask/:thisTaskCardId/thisUser/:userId`,
  async (req, res, next) => {
    try {
      const { userId, thisTaskCardId: taskcardId } = req.params;
      console.log(req.body);
      const thisTaskCard = await UserTaskCard.findAll({
        where: { userId: userId, taskcardId: taskcardId },
      });

      if (thisTaskCard.length < 1) {
        const createTaskCard = await UserTaskCard.create({
          userId: userId,
          taskcardId: taskcardId,
        });
        return res.status(201).json(createTaskCard);
      }

      res.status(406).json("Nothing was done.");
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/tasks/thisTask/:thisTaskCardId/thisUser/:userId/thisBoard/:boardId,
// here we delete
router.delete(
  `/thisTask/:thisTaskCardId/thisUser/:userId/thisBoard/:boardId`,
  async (req, res, next) => {
    try {
      const {
        boardId: thisBoard,
        userId,
        thisTaskCardId: taskcardId,
      } = req.params;

      const isUserAdmin = await UserBoard.findOne({
        where: { userId: userId, boardId: thisBoard },
      });

      if (isUserAdmin.dataValues.privilege != "ADMIN")
        return res.status(406).json("lol");

      const taskCardBeingDeleted = await TaskCard.findOne({
        where: { id: taskcardId },
      });

      const deleteTaskCard = await TaskCard.destroy({
        where: { id: taskcardId },
      });

      res.status(201).json(taskCardBeingDeleted);
    } catch (err) {
      next(err);
    }
  }
);
// the above put request should suffice
// PUT /api/tasks/:taskId
// router.put("/:taskId", async (req, res, next) => {
//   try {
//     const { title, start, end } = req.body;
//     const task = await TaskCard.update(
//       { title, start, end },
//       { where: { id: req.params.taskId } }
//     );
//     res.status(200).json({ message: "Task updated successfully" });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
