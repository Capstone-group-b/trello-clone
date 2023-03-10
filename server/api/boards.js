const router = require("express").Router();
const Board = require("../db/models/Board");
const UserBoard = require("../db/models/UserBoard");
const List = require("../db/models/List");
const TaskCard = require("../db/models/TaskCard");
const User = require("../db/models/User");
const Comment = require("../db/models/Comment");

// GET /api/boards
router.get("/", async (req, res, next) => {
  try {
    console.log("***** Boards backend route hit *****");
    const boards = await Board.findAll();
    res.status(200).json(boards);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/boards/archiveBoard/boardId/:boardId/userRequesting/:userId
router.patch(
  "/archiveBoard/boardId/:boardId/userRequesting/:userId",
  async (req, res, next) => {
    try {
      const { boardId, userId } = req.params;
      const getUser = await UserBoard.findAll({
        where: { userId: userId, boardId: boardId },
      });
      const userPrivilege = getUser[0].dataValues.privilege;;

      if (userPrivilege != "ADMIN")
        return res.status(401).json("User must be an admin to do this.");
      const board = await Board.findByPk(boardId);

      const archiveBoard = await Board.update(
        { isArchived: !board.isArchived },
        { where: { id: boardId } }
      );

      const updatedBoard = await Board.findByPk(boardId);

      res.status(201).json(updatedBoard)

    } catch (err) {
      next(err);
    }
  }
);

// GET /api/boards/allUsers/:boardId
router.get("/allUsers/:boardId", async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const users = await UserBoard.findAll({
      where: { boardId },
      include: { model: User },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/boards/thisUser/:userId/thisBoard/:boardId
router.delete(
  "/thisUser/:userId/thisBoard/:boardId",
  async (req, res, next) => {
    try {
      console.log(`***
      ***
      ***
      Logging:userId, boardId
      ***
      ***
      ***
      `, req.params.userId, req.params.boardId);
      const theUserBoardAssociation = await UserBoard.findOne({
        where: { userId: req.params.userId, boardId:req.params.boardId },
      });
      if (!theUserBoardAssociation)
        res.status(404).json("User Not Found");

      const theUserRemoved = theUserBoardAssociation.dataValues;
      const deleteUserBoard = await UserBoard.destroy({
        where: { userId: req.params.userId, boardId: req.params.boardId },
      });
      res.status(201).json(theUserRemoved);
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/boards/:userId/:boardId
router.get("/:userId/:boardId", async (req, res, next) => {
  try {
    const board = await Board.findByPk(req.params.boardId, {
      include: {
        model: List,
        separate: true,
        order: [["position", "ASC"]],
        include: {
          model: TaskCard,
          separate: true,
          order: [["position", "ASC"]],
          include: {
            model: Comment,
            separate: true,
            order: [["createdAt", "DESC"]],
            include: [User],
          },
        },
      },
    });
    res.status(200).json(board);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(`The\npost\nthing\nis\nhere\n HAHA`, req.body);
    const newBoard = await Board.create({
      boardName: req.body.boardName,
      creatorId: req.body.loggedInUserId,
    });

    const userBoard = await UserBoard.create({
      userId: req.body.loggedInUserId,
      boardId: newBoard.id,
      privilege: "ADMIN",
    });
    res.status(201).send(newBoard);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
