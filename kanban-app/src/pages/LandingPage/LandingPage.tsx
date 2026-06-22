import { useForm } from "react-hook-form"
import { PrimaryBtn } from "../../components/Button/Button"
import { useGetOTPMutation, useVerifyOTPMutation } from "../../redux/slices/authApiSlice"
import styles from "./LandingPage.module.scss"
import type { InitialState, LoginData } from "./LandingPage.types"
import { useReducer } from "react"
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"

const initialState = {
  OTPsent : false
}

const reducer = (state:InitialState, action:{ type:string }) => {
  switch(action.type){
    case("OTPsent"):
      return {...state, OTPsent : true}
     default:
      return state
  }

}

const LandingPage = () => {

  const [ getOTP ]  = useGetOTPMutation();
  const [ verifyOTPService ] = useVerifyOTPMutation();
  const { register, handleSubmit } = useForm<LoginData>();
  const [state, dispatch] = useReducer(reducer ,initialState);
  const navigate = useNavigate();

  const handleOTPSending = async(data: LoginData) => {
    const response = await getOTP(data).unwrap();
    if(response.data.statusCode===200){
      dispatch({type:"OTPsent"})
    }
  }

  const verifyOTP = async(data: LoginData) => {
    const response = await verifyOTPService(data).unwrap();
    if(response.data.statusCode===200){
      toast.success("Login Success!")
      console.log(response)
      setTimeout(() => {
        navigate('/superadmin')
      }, 3000);
    }
  }

  return (
    <div className={styles.LandingPage}>
        <div className={styles.Container}>
            <div className={styles.ImageContainer}>
              <img src="Researchpaper.gif" alt="" />
            </div>
            <div className={styles.Box}>
              <div className={styles.TextBox}>
                <div className={styles.TextBoxHeading}>
                  <h2>
                    Kanban Board
                  </h2>
                  <h4>Where your teams and AI come together</h4>
                </div>
              </div>
              <div className={styles.LoginBox}>
                <div>
                  <h2>Login</h2>
                </div>
                <form onSubmit={!state.OTPsent ? handleSubmit(handleOTPSending) : handleSubmit(verifyOTP)} className={styles.LoginForm}>
                  {!state.OTPsent ? <div className={styles.LoginBoxInput}>
                    <input type="email" {...register("email")} placeholder="You@comapany.com"/>
                    <PrimaryBtn  className={styles.LoginBtn}>Continue</PrimaryBtn>
                  </div>
                : 
                  <div className={styles.LoginBoxInput}>
                    <input type="text" {...register("otp", {maxLength: 6, minLength:6})} placeholder="Enter OTP"/>
                    <PrimaryBtn className={styles.LoginBtn}>Login</PrimaryBtn>
                  </div>
                }
                <ToastContainer position="top-center"/>
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage