// import { ObjectId } from "mongodb";
import { getCookie, setCookie } from "cookies-next";
import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader";
import Popup from "../../components/Popup";
import TextInput from "../../components/TextInput";
import Image from "next/image";
import SmallBackground1 from "../../components/SmallBackground1";

const Authentication: NextPage = () => {
    const [strUsername, setStrUsername] = useState("");
    const [strEmail, setStrEmail] = useState('');
    const [strPassword, setStrPassword] = useState('');
    const [strPassword1, setStrPassword1] = useState('');
    const [blnLoading, setBlnLoading] = useState(true);
    const [blnPopup, setBlnPopup] = useState(false)
    const [listPopupData, setListPopupData] = useState({
        title: "",
        content: [
            {}
            // {
            //     type: "input",
            //     label: "Username",
            // },
            // {
            //     type: "input",
            //     label: "Password",
            // }
        ],
        button: [
            {}
            // { 
            //     text: 'Ok',
            //     blnDisable: false,
            //     style: 'primary',
            // },
            // { 
            //     text: 'Cancel',
            //     blnDisable: false,
            //     style: 'danger',
            // }

        ],
        footer: ''
    })
    const [accountData, setAccountData] = useState(
        {

        }
    )
    const[usernameProps, setUsernameProps] = useState({
        required: true,
        labelName: "Create new password",
        value: "",
        type: "text",
        onInput: setStrUsername,
        validate: "",
        trigger: false,
    });
    const[emailProps, setEmailProps] = useState({
        required: true,
        labelName: "Create new password",
        value: "",
        type: "email",
        onInput: strEmail,
        validate: "Email",
        trigger: false,
    });
    const[passwordProps, setPasswordProps] = useState({
        required: true,
        labelName: "Create new password",
        value: "",
        type: "password",
        onInput: setStrPassword,
        validate: "Password",
        trigger: false,
    })
    const[password1Props, setPassword1Props] = useState({
        required: true,
        labelName: "Confirm your password",
        value: "",
        type: "password",
        onInput: setStrPassword1,
        validate: "Password",
        trigger: false,
    })
    const popupCallback = async (childData: boolean) => {
        setBlnPopup(childData)
        if (childData && listPopupData.title == "Forgot your password") {
            const email = "jirapon.ja@mail.wu.ac.th"
            const response = await fetch('/api/support/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            console.log(response.json())
        }
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            setBlnLoading(false);
        }, 2500)
        console.log(getCookie("myToken"))
    })

    async function signup() {
        if (strPassword === strPassword1) {
            setBlnLoading(true);
            const params = await {
                username: strUsername,
                email: strEmail,
                password: strPassword,
            }

            // const duplicateEmail = await fetch('/api/accounts/check-duplicate-email', {
            //     method: 'POST',
            //     body: JSON.stringify({strEmail}),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },

            // })
            // const dEmail =  await duplicateEmail.json()
            // console.log(dEmail)
            // if( !dEmail)
            {
                const response = await fetch('/api/accounts/create-account-one', {
                    method: 'POST',
                    body: JSON.stringify({ params }),
                    headers: {
                        'Content-Type': 'application/json'
                    },

                }).then((response) => {
                    // Router.push('/api/accounts/get-accounts-all')
                    console.log(response);
                    document.cookie = `name=${response}`;
                }).catch((error) => {
                    console.log(error)
                });
            }
        } else ('password not match')
    }
    async function login() {
        setBlnLoading(true)
        console.log("")
        const params = await {
            username: strEmail,
            password: strPassword
        }
        const response = await fetch('/api/accounts/signin', {
            method: 'POST',
            body: JSON.stringify({ params }),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': "listUserInfo.token"
            },
        })
        const responseData = await response.json()
        setBlnLoading(false)
        console.log(responseData)
        if (responseData.status == 'success') {
            setBlnPopup(true)
            setListPopupData(listPopupData => ({ ...listPopupData, title: responseData.status }))
            const timeout = setTimeout(() => {
                setBlnPopup(false)
            }, 1000);
            setCookie("myToken", responseData.token);
            setCookie("myAvatar", responseData.data.avatar, { maxAge: 300 });
            setCookie("myName", responseData.data.username, { maxAge: 300 });
            setCookie("myWallet", responseData.data.username, { maxAge: 300 });
            setCookie("myCredits", responseData.data.username, { maxAge: 300 });
            setCookie("myGems", responseData.data.username, { maxAge: 300 });

            Router.push('/');
            console.log(getCookie("myToken"))
        } else {
            setBlnPopup(true)
            setListPopupData(listPopupData => ({ ...listPopupData, title: responseData.status }))
            const timeout = setTimeout(() => {
                setBlnPopup(false)
            }, 1000);
        }
    }
    async function forgotPassword() {
        setListPopupData(listPopupData => ({
            ...listPopupData,
            title: "Forgot your password",
            content: [
                {
                    type: "input",
                    label: "Enter your email address",
                },
                // {
                //     type: "input",
                //     label: "Password",
                // }
            ],
            button: [
                {
                    text: 'Reset Password',
                    blnDisable: false,
                    style: 'primary',
                },
                {
                    text: 'Cancel',
                    blnDisable: false,
                    style: 'danger',
                },
            ]
        }))
        setBlnPopup(true)
    }
    return (
        <div >
            <Loader isLoading={blnLoading} />
            <div className="">
                <div id="signin" className="d-flex">
                    <div className="form sign-in-container bg-glass" style={{ backgroundColor: "white", minHeight: '100vh' }}>
                        <div className="logo-text d-flex">
                            <Image src={'/favicon.ico'} width={'50px'} height={'50px'} /><h2 className="">INSTEADIZE</h2>
                        </div>

                        <h1>Log in to your account</h1>
                        <div className="form-control">
                            <form className="">
                                <TextInput {...usernameProps} />
                                <TextInput {...passwordProps} />
                            </form>
                            <div className="d-flex px-2">
                                <a className='link' onClick={e => { forgotPassword() }}>forgot password?</a>
                            </div>
                            <button className="btn-primary" onClick={(e) => login()}>Login</button> Don&apos;t have an account? <a className='link'>  Signup</a>

                        </div>
                    </div>
                    <div style={{ padding: '48px' }}>
                        <div className="">
                            <h1 className="">Create Next App</h1>
                        </div>
                        <SmallBackground1 />
                    </div>

                </div>
                <div id="signup" className="d-flex">
                    <div style={{ padding: '48px' }}>
                        <div className="">
                            <h1 className="">Create Next App</h1>
                        </div>

                    </div>
                    <div className="form sign-up-container bg-glass" style={{ backgroundColor: "white", minHeight: '100vh', justifyContent: 'flex-start' }}>
                        <div className="logo-text d-flex">
                            <Image src={'/favicon.ico'} width={'50px'} height={'50px'} /><h2 className="">INSTEADIZE</h2>
                        </div>
                        <h1>Create your account</h1>
                        <div className="form-control">
                            <form className="">
                                <TextInput {...usernameProps} />
                                <TextInput {...emailProps} />
                                <TextInput {...passwordProps}/>
                                <TextInput {...password1Props} />
                                {strPassword !== strPassword1 ? <div className="invalid-message">Password not match</div> : ""}
                            </form>
                            <div className="d-flex px-2">
                                <input id="privacy-checkbox" type="checkbox" style={{ width: '25px', height: '25px', marginRight: '10px' }} />
                                <label htmlFor="privacy-checkbox">I agree the <a className="link">Privacy Policy</a> and <a className="link">Terms of Service</a>.</label>
                            </div>
                            <button className="btn-primary" onClick={(e) => signup()}>SIGN UP</button> Have an account? <a className='link'>Log in now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication;