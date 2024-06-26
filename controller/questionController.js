//* db connection
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const generateUniqueId = require("generate-unique-id");


async function allquestions(req, res) {
  try {
    const [getquestions] = await dbConnection.query(
      "select users.username, questions.title,questions.questionid from users join questions on users.userid = questions.userid ORDER BY questions.id DESC"
    );
    console.log(getquestions);

    return res.status(StatusCodes.OK).json(getquestions);
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function askquestions(req, res) {
  const { title, description } = req.body;
  const { userid } = req.user;

  const questionid = generateUniqueId({
    length: 8,
    useLetters: false,
    useNumbers: true,
  });

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO questions(questionid, userid, title, description) VALUES (?,?,?,?)",
      [questionid, userid, title, description]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "thanks for asking" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function questiondesc(req, res) {
    const {questionid} = req.params
    try {
      const [getquestions] = await dbConnection.query(
        "select title, description from questions where questionid = ?", [questionid]
      );
      console.log(getquestions);
  
      return res.status(StatusCodes.OK).json(getquestions);
    } catch (error) {
      console.log(error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "something went wrong, try again later!" });
    }
  }

module.exports = { askquestions, allquestions, questiondesc };
