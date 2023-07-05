
import React, { useContext, useEffect, useState }  from 'react';
import queryString from 'query-string'
import ReactLoading from 'react-loading';
import { Link, useHistory, useLocation } from 'react-router-dom';

function Problem() {

    const query = queryString.parse(useLocation().search) 
    const [page, setPage] = useState( Math.max(query.page || 1), 1 )
    const problem = [
        {title:"Search",
        id:1}
    ]



  return (
    <div>
        {!problem && 
          <div className="flex flex-wrap container mx-auto">
            <ReactLoading type={"bars"} color={"#2563EB"} height={667} width={375} className="mx-auto"/>
          </div> 
        }
        {problem && <div>
        <div className="flex flex-wrap container mx-auto p-4">
                <div className="mx-auto">
                    <div className="p-2 m-2 font-black text-3xl text-blue-600">Problem</div>
                </div>
            </div> 
            
            <div className="flex flex-wrap container mx-auto p-4">
                <div className="mx-auto">
                    <button className="bg-blue-600 text-white rounded p-2 m-2 focus:bg-blue-700 focus:text-white" style={{width: "60px"}}>Page</button>
                    <input type="number" value={page} className="border border-blue-600 text-center" onChange={e => setPage( Math.max( parseInt(e.target.value.trim()), 1 ) )}/>
                    <button className="bg-blue-600 text-white rounded p-2 m-2 focus:bg-blue-700 focus:text-white" style={{width: "60px"}}>&#8611;</button>
                </div>
            </div> 

            <div className="flex flex-wrap container mx-auto">
                <table className="border-collapse border border-blue-600 mx-auto w-full">
                    <thead>
                        <tr>
                            <th className="border border-blue-600 p-2 text-lg">ID</th>
                            <th className="border border-blue-600 p-2 text-lg">Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            problem.map((each, index) => {
                                return (
                                    <tr>
                                        <td className="border border-blue-600 p-2 text-center font-black"><Link to={`/problem/${each.title}`}>{each.id}</Link></td>
                                        <td className="border border-blue-600 p-2 text-center font-black"><Link to={`/problem/${each.title}`}>{each.title}</Link></td>
                                    </tr>
                                )   
                            })
                        }
                    </tbody>
                </table>
            </div>
            </div>
            }
    </div>
  );
}

export default Problem;
