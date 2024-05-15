import { useContext,useState} from "react";
import { TasksContext, TasksDispatchContext } from './TaskContext.js';
import { TaskList } from "./TaskList.js";
export function Page(){
    const tasks = useContext(TasksContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    //每页分4个
   const  startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = tasks.slice(startIndex, endIndex);

    function handleClick(nowpage){ 
        setCurrentPage(nowpage);
        // dispatch()
      };

      function pageadd(){
        if(currentPage<totalPages){
        setCurrentPage(c=>c+1)}
      }
      function pagedecrease(){
        if(currentPage>1){
          setCurrentPage(c=>c-1)
        }
      }
      function activepage(nowpage){
    return <button data-page={nowpage} className="active-page"></button>
      }
      activepage(1)
    // 计算总页数
    const totalPages = Math.ceil(tasks.length / itemsPerPage);

     function createButtons () {
        let buttons = [];
        for (let i = 1; i <= totalPages; i++) {
          let Buttonclass='page-btn'
          if (i === currentPage) {
            Buttonclass   += " active-page"; // 如果是当前页，添加active-page类名
          }
          buttons.push(
            <button
              key={i} data-page={i}
             className={Buttonclass}
              onClick={() =>{ handleClick(i) ;}}
            >
              {i}
            </button>
          );
        }
        return buttons;
        // const buttons = Array.from({ length: totalPages }, (_, index) => index + 1)创建数组再遍历
      };
    return (  <>
    <TaskList tasks={pageData} /> 
    <div className="paging">
    <button className="pre" onClick={pagedecrease}>&lt;</button>
    <div style={{display:'inline'}} id="pagination">{createButtons()}</div>
    <button  className="next" onClick={pageadd}>&gt;</button>
    </div>

</>
)
}