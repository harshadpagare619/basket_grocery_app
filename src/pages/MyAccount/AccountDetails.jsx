import {useEffect} from 'react';
import { useSelector } from 'react-redux';


function AccountDetails() {

  const user = useSelector(state => state.user);

  console.log("Redux user details: ", user);

  useEffect(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant"
        });
      }, []);


  return (
    <>
    <h4 className='mb-4'>My Account</h4>
        <div className='mb-3'>
            <label className='form-label'>Full Name</label>
            <input 
            type="text" 
            value={user.user?.name || ""}
            className='form-control' 
            readOnly 
            />
        </div>

        <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input 
            type="email" 
            className='form-control' 
            value={user.user?.email || ""}
            readOnly 
            />
        </div>
    </>
  )
}

export default AccountDetails