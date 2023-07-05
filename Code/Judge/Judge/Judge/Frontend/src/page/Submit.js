
import React, { useLayoutEffect,useState,useRef }  from 'react';
import { useHistory } from 'react-router';

import {BACKEND_URL} from '../util/config'
import AceEditor from "react-ace";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ReactLoading from 'react-loading';

function Submit(props) {
    const title = props.match.params.title
    const [loading, setLoading] = useState(true)
    const [language, setLanguage] = useState("python")
    const [result, setResult] = useState("Submission cannot be shown. Please solve the problem first.")
    const [read, setRead] = useState(["",""])
    const [write, setWrite] = useState(["",""])
    const [read_code, setReadcode] = useState(["",""])
    const [write_code, setWritecode] = useState(["",""])
    const [content, setContent] = useState("")
    const [buttonDisable, setButtonDisable] = useState(false)
    const [error, setError] = useState("")
    const history = useHistory()
    const [value, setValue] = React.useState(1);
    const [only, setOnly] = useState(true)
    const re = useRef(null);
    const [hasresult, setHasResult] = useState(false)

    useLayoutEffect(()=>{
        
        console.log(props.match.params.title)
        try{

              fetch(`${BACKEND_URL}/View/${title}`).then(req=>req.json())
                .then(data=>{
                console.log(data) //请求到的数据
                if(data.result.name === title) {
                    setRead(Object.keys(data.result.read))
                    setWrite(Object.keys(data.result.write))
                    setReadcode(Object.values(data.result.read))
                    setWritecode(Object.values(data.result.write))
                    setContent(Object.values(data.result.read)[0])
                    setLoading(false)
                    console.log("hello")
                } else {
                    history.push('/404')
                    // history.go(0)
                }
                })

        }catch(err){
            //history.push('/404')
        }


    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(newValue>10){
            setContent(write_code[newValue-11])
            setOnly(false)
        }else{
            setContent(read_code[newValue-1])
            setOnly(true)
        }
    };

    const handleInput = (event) => {
        if(value>10){
            setContent(event);
            var temp = write_code
            temp[value-11] = event
            setWritecode(temp)
        }
    };

    const submit = async () => {
        if(!language) {
            setError('Language is required')
            return;
        }
        if(buttonDisable) {
            setError('Slow down');
            return;
        }
        setButtonDisable(true);
        try{
            let formData = new FormData();

            for (var key in write) {
                formData.append(write[key],write_code[key]);
                console.log(formData)
              }
            // //console.log(post_data)
            const response = await fetch(`${BACKEND_URL}/Judge/${title}`, {
                method: 'POST',
                body: formData
              })
            const response_data = await response.json()
            console.log(response_data)
            if(response_data.result){
                setResult(response_data.result)
                setError("")
                setButtonDisable(false)
                setHasResult(true)
                re.current.focus()
            }
        }catch(err){
            //console.log(err)
            setError('Error encountered')
        }
    }


  return (
    <div>
        <div className="flex flex-wrap container mx-auto">
            <span className="mx-auto text-3xl font-black text-blue-600">Submit</span>
        </div>
        <br/>
        <div className="flex flex-wrap container mx-auto">
            <div className="mx-auto">
                <select id = "verdictList" onChange={e => setLanguage(e.target.value)} value={language} className="border border-blue-600 text-center m-2 p-1">
                    <option value="">Language</option>
                    <option value="python">python</option>
                </select>
            </div>
        </div>
        <div className="flex flex-wrap container mx-auto">
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable auto tabs example"
              >
                {read.map((item,index)=>{
                    return <Tab color='green' value={index+1} label={item + "🔒"} />
                })}
                {write.map((item,index)=>{
                    return <Tab value={index+11} label={item} />
                })}
              </Tabs>
            {/* <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                highlight={code => code}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    minHeight: '500px'
                }}
                className="w-full border-2 border-blue-600 rounded bg-gray-200 p-4"
                placeholder="Your Code Goes brrr..."
            /> */}
            <AceEditor
                onChange={handleInput}
                name="Code editor"
                fontSize="15px"
                mode={language}
                readOnly={only}
                value={content}
                editorProps={{ $blockScrolling: true }}
                className="w-full border border-blue-600"
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: true,
                    highlightActiveLine: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
        </div>
        {error && <div className="flex flex-wrap container mx-auto">
            <div className="mx-auto p-2 m-2 text-red-600" onClick={e => submit()}>{error}</div>
        </div>}
        <div className="flex flex-wrap container mx-auto">
            <button className="mx-auto p-2 m-2 bg-blue-600 text-white rounded focus:bg-blue-700 focus:text-white" onClick={e => submit()} disabled={buttonDisable}>Submit</button>
        </div>
        {hasresult?
            <><Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Result
                  </Typography>
                </CardContent>
            </Card>
            <div className="flex flex-wrap container mx-auto">
            <textarea
                    value={result}
                    ref={re}
                    readOnly
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        minHeight: '500px'
                    }}
                    className="w-full border-2 border-blue-600 rounded bg-gray-200 p-4"
                /></div></>:""}
            
    </div>
  );
}

export default Submit;
