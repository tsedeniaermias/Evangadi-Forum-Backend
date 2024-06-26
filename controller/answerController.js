//* db connection
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function answeredquestions(req, res) {
  const { questionid } = req.params;
  try {
    const [getanswers] = await dbConnection.query(
      "select users.username, answers.answer from users join answers on answers.userid = users.userid where questionid = ?", [questionid]
    );
    console.log(getanswers);

    return res.status(StatusCodes.OK).json(getanswers);
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}
async function answerquestions(req, res) {
  const { answer } = req.body;
  const { userid } = req.user;
  const { questionid } = req.params;

  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO answers(userid, questionid, answer) VALUES (?,?,?)",
      [userid, questionid, answer]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Thank you for responding" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

module.exports = { answeredquestions, answerquestions };
