
import React, { useEffect, useState }  from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
// import queryString from 'query-string'
import {BACKEND_URL} from '../util/config'
import ReactLoading from 'react-loading';

function ShowProblem(props) {

    // const query = queryString.parse(useLocation().search)
    const title = props.match.params.title
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [read_file, setReadFile] = useState(null)
    const [write_file, setWriteFile] = useState(null)
    const [content, setContent] = useState(null)
    // time_limit: timeLimit, memory_limit: memoryLimit, content, title, author

    useEffect(()=>{
        try{

              fetch(`${BACKEND_URL}/View/${title}`).then(req=>req.json())
                .then(data=>{
                console.log(data) //请求到的数据
                if(data.result.name === title) {
                    setContent(data.result.introduction)
                    setReadFile(Object.keys(data.result.read).length)
                    setWriteFile(Object.keys(data.result.write).length)
                    setLoading(false)
                } else {
                    history.push('/404')
                    // history.go(0)
                }
                })

        }catch(err){
            //history.push('/404')
        }


    }, [])

    const submit = ()=> {
        history.push(`/submit/${title}`)
        // history.go(0)
    }

  return (
    <div>
        {loading && 
          <div className="flex flex-wrap container mx-auto">
            <ReactLoading type={"bars"} color={"#2563EB"} height={667} width={375} className="mx-auto"/>
          </div> 
        }
        {!loading && <div><div className="flex flex-wrap container mx-auto">
            <table className="mx-auto w-full m-2">
                <tr>
                    <th className="border border-blue-600 ">The number of only read files</th>
                    <th className="border border-blue-600">The number of files to edit</th>
                    <th className="border border-blue-600">Action</th>
                </tr>
                <tr>
                    <td className="border border-blue-600 text-center">{read_file}</td>
                    <td className="border border-blue-600 text-center">{write_file}</td>
                    <td className="border border-blue-600 text-center"> <button className="p-2 m-2 bg-blue-600 text-white rounded focus:bg-blue-700 focus:text-white" onClick={submit}>Submit</button></td>
                </tr>
            </table>
        </div>
        <br/>
        <div className="flex flex-wrap container mx-auto">
            <span className="mx-auto text-2xl font-black">{title}</span>
        </div>
        <br/>
        <div  dangerouslySetInnerHTML={{__html: content}}>
        </div>
        {/* <div className="flex flex-wrap container mx-auto border-2 border-blue-600 p-2 text-justify" >
            <EditorJs
                data={content}
            />
        </div> */}
    </div>}
    </div>
  );
}

export default ShowProblem;
