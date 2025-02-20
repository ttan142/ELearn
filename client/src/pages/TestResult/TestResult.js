import React,{useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import "./TestResult.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Answer from "../../components/TestResult/Answer";
import CommentCard from "../../components/comment/CommentCard";
function TestResult(props) {

  const location = useLocation();
  const { resultId } = location.state;      //RESULTid
  const [data,setData] = useState([])
  const history = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{

      axios.get("http://localhost:5000/api/results/test/".concat(resultId)).then(
        (response) => {
          console.log(response);  
          setData(response.data.result[0]);
          
        },
        (error) => {
          console.log(error);
        }
      ); 
  },[])
   
   useEffect(()=>{
    console.log(data);
   },[data])
   
   const handleDetailResult = ()=>{
     history(`/result/details/${resultId}`)
   }

   const handleAgain = ()=>{
    axios.get("http://localhost:5000/api/test/".concat(resultId)).then(
      (response) => {
        console.log(response.data[0].result);
      history(`/test/${response.data[0].result._id}`, {
        state: response.data[0].result,
      }); 
      },
      (error) => {
        console.log(error);
      }
    ); 
   }
  return (
    <>
      <section id="test-result">
        <div className="content">
          <div className="head-content">
            <h1>
              {" "}
              Kết quả thi : {data.testResult &&
                data.testResult[0].name} Test{" "}
              {data.testResult && data.testResult[0].test}
            </h1>
            <button className="result"> Xem đáp án </button>
            <button onClick={handleAgain} className="result">
              {" "}
              Làm lại bài thi{" "}
            </button>
          </div>
          <div className="result-content">
            <div className="result-item">
              <p>
                <i class="fa fa-list-alt" aria-hidden="true"></i>Kết quả làm bài
                : {data.result}
              </p>
              <p>
                {" "}
                <i id="correct" class="fa fa-check" aria-hidden="true"></i>Độ
                chính xác : {data.accuracy} %
              </p>
              <p>
                <i class="fas fa-clock"></i>Thời giàn làm bài : {data.time}
              </p>
            </div>
            <div className="result-item">
              <i id="correct" class="fa fa-check" aria-hidden="true"></i>
              <p>Trả lời đúng </p>
              <p>{data.correct}</p>
            </div>
            <div className="result-item">
              <i id="wrong" class="fa fa-times" aria-hidden="true"></i>
              <p>Trả lời sai </p>
              <p>{data.wrong}</p>
            </div>
            <div className="result-item">
              {" "}
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
              <p>Bỏ qua </p>
              <p>{data.skip}</p>
            </div>
            <div className="result-item">
              {" "}
              <i class="fas fa-flag-checkered"></i>
              <p>Điểm </p>
              <p>{data.score}</p>
            </div>
          </div>
          <div className="test-result">
            Đáp án{" "}
            <span>
              <button onClick={handleDetailResult} className="result">
                Xem chi tiết đáp án
              </button>
            </span>
          </div>
        </div>

        <Answer resultId={resultId} />
        {/* Comment of that test */}
        {data.testResult && <CommentCard id={data.testResult[0]._id} />}
      </section>
    </>
  );
}

export default TestResult;
/*<div className="content">
          <Comments
            commentsUrl="http://localhost:3004/comments"
            currentUserId="1"
          />
         //can cai testid
          <CommentCard id={ data.testResult[0]._id} />
        </div>*/ 