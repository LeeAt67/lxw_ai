import {
  useState,
} from 'react'
import './App.css'
import PictureCard from './components/PictureCard'

function App() {
  // 上传图片的状态
  const [word, setWord] = useState('请上传图片');
  // 例句
  const [sentence, setSentence] = useState('');
  // 英文声音
  const [audio, setAudio] = useState('');
  // 详情内容展开
  const [detailExpand, setDetailExpand] = useState(false);
  const [imgPreview, setImgPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png');
  const uploadImg = async () => {

  }
  return (
    <div className="container">

      <PictureCard
        audio={audio}
        word={word}
        uploadImg={uploadImg}
        detailExpand={detailExpand}
      />

      <div className="output">
        <div>{sentence}</div>
        <div className="details">
          <button onClick={() => setDetailExpand(!detailExpand)}>Talk about it</button>
          {
            detailExpand ?
              (
                <div className="expand">
                  <img src={imgPreview} alt="preview" />
                </div>
              ) : (
                <div className=" fold" />
              )
          }
        </div>
      </div>
    </div>
  )
}

export default App
