import React, { useState } from 'react'
import Webcam from 'react-webcam'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Profile = () => {
    const notify = (msg = "提交成功!", type = "success") => toast(msg, {
        position: toast.POSITION.TOP_CENTER,
        className: 'items-center',
        type: type,
        autoClose: 1*1000,
        });

  const [picture, setPicture] = useState('')
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(async () => {
    const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc)
  })

  const varify = React.useCallback(async (image) => {
    const binaryString = atob(image.split(',')[1]);
    const array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      array[i] = binaryString.charCodeAt(i);
    }
    const file = new File([array.buffer], 'face.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('image', file);
    try {
        const response = await fetch(`${process.env.BACKEND_URL}api/facelogin`, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        result.status ? notify("登陆成功" + result.userinfo.name) : notify("登陆失败")
        console.log(result);
      } catch (error) {
        console.error(error);
      }
  })

  return (
    <div>
        <ToastContainer />
      <h2 className="mb-5 text-center">
        人脸识别登录，请抓取人脸
      </h2>
      <div>
        {picture == '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} />
        )}
      </div>
      <div>
        {picture != '' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture("")
            }}
            className="btn btn-primary"
          >
            重新抓取
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn btn-danger"
          >
            抓取人脸
          </button>
        )}
      </div>
      <div>
        {picture != '' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              varify(picture)
            }}
            className="btn btn-primary"
          >
            验证
          </button>
        ) : ""}
      </div>
    </div>
  )
}
export default Profile