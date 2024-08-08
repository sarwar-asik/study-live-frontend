/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoaderSubmit from '../../components/shared/LoaderSubmit';
import { authKey, SERVER_URL } from '@/helper/const';
import toast from 'react-hot-toast';
import { setToLocalStorage } from '@/helper/authHelper';
import AuthContext from '@/context/AuthProvider';
import Logo from '@/components/shared/Logo';


export default function SignUp() {
  const { refreshUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // const image = formData.get('image') as File;
    // const name = formData.get('name') ;
    // console.log("🚀", name)

    console.log(formData)
    const formElement = event.currentTarget;

    setLoading(true)
    const response = await postSSDataWithFile(`${SERVER_URL}/auth/sign-up`, formData);

    // console.log(response)
    setLoading(false)
    if (response?.data.accessToken) {
      toast("SIgn Up  success")
      setToLocalStorage(authKey, response?.data.accessToken)
      formElement.reset();
      await refreshUser()
      navigate(`/users`)
      // reset the form
    } else {
      toast("Failed to sign up")

    }
    // console.log(data);
    // console.log(response);


  }


  async function postSSDataWithFile(
    url: string,
    formData: FormData,
    options = {} as RequestInit
  ): Promise<any> {
    try {
      const response = await fetch(url, {
        method: "POST",
        ...options,
        body: formData, // FormData instance containing file and other data
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json(); // Parsing JSON response from the server
    } catch (error) {
      console.error("Error in postSSDataWithFile:", error);
      throw error; // Propagate the error to the caller for handling
    }
  }

  return (
    <React.Fragment>
      <div className="min-h-screen bg-login-bg bg-cover bg-center flex items-center justify-center relative ">
        <div className="absolute inset-0 bg-black bg-opacity-5 backdrop-blur-sm"></div>
        <section className='z-40 flex flex-col gap-5'>
          <Logo />

          <form onSubmit={onSubmit} className="max-w-4xl md:mx-auto w-full bg-[#172B4DB2] px-3 lg:px-[7rem] rounded-md py-2 lg:py-[5rem]  z-40 border border-[#7A00B8B2]">
            <h3 className="text-white text-3xl font-extrabold mb-8 text-center">Create new account</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className='text-white font-semibold my-3 text-lg'>Your Name</label>
                <input
                  name="name"
                  type="text"
                  // autoComplete="email"
                  required
                  className="bg-[#52545BCC] w-full text-sm text-white px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent mt-3"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className='text-white font-semibold my-3 text-lg'>Your Email</label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="bg-[#52545BCC] w-full text-sm text-white px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent mt-3"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className='text-white font-semibold my-3 text-lg'>Type Password</label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-[#52545BCC] w-full text-sm text-white px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent mt-3"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="image" className='text-white font-semibold my-3 text-lg'>Select your Profile</label>
                <input
                  name="image"
                  type="file"

                  required
                  className="bg-[#52545BCC] w-full text-sm text-white px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent mt-3"
                  placeholder="Password"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-100"
                  >
                    Remember me
                  </label>
                </div>
                {/* <div className="text-sm">
                    <Link
                      to="/"
                      className="text-blue-600 hover:text-blue-500 font-semibold"
                    >
                      Forgot your password?
                    </Link>
                  </div> */}
              </div>
            </div>
            <div className="!mt-8">
              {
                loading ? <LoaderSubmit /> :

                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-primary hover:bg-primary/85 focus:outline-none"
                  >
                    Sign Up
                  </button>
              }

            </div>

            <div className='text-white text-center flex  mt-5 items-center justify-center gap-3'>   <h2>Already have an account?</h2>
              <Link to="/login">Login now</Link>
            </div>
            <div className="space-x-6 flex justify-center mt-8">
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132"
                  />
                </svg>
              </button>
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#1877f2"
                    d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z"
                    data-original="#1877f2"
                  />
                  <path
                    fill="#fff"
                    d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z"
                    data-original="#ffffff"
                  />
                </svg>
              </button>
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  viewBox="0 0 22.773 22.773"
                >
                  <path
                    d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                    data-original="#000000"
                  />
                </svg>
              </button>
            </div>

          </form>
        </section>


      </div>
    </React.Fragment>
  )
}
