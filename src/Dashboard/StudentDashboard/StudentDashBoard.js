import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCretater, subscribeToTeacher, unsubscribetoTeacher} from '../../actions/subscribers';
import img from "../../assets/pngegg.png"
import { Button, Spinner } from 'react-bootstrap';

function ALLCreater() {


  const allCreterwithSubStatus = useSelector(state => state.subcriptiondata.allCreterwithSubStatus);
  const subcribeSuccess = useSelector(state => state.subcriptiondata.subcribeSuccess);
  const unsubcribeSuccess = useSelector(state => state.subcriptiondata.unsubcribeSuccess);
  console.log(unsubcribeSuccess);
  const [loading, setLoading] = useState(false); // Add loading state

console.log(allCreterwithSubStatus);
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchAllCretater())
      setLoading(false)
  
    }, [dispatch,subcribeSuccess,unsubcribeSuccess]);
  

    const handleSubscribe = async (id) => {
      setLoading(true)
      // Dispatch action to subscribe student to teacher
  dispatch(subscribeToTeacher(id))
    }

  const handleUnsubscribe = (id) => {
    setLoading(true)

      dispatch(unsubscribetoTeacher(id));
  };
  useEffect(() => {
    if (subcribeSuccess || unsubcribeSuccess) {
      setLoading(false);
    }
  }, [subcribeSuccess, unsubcribeSuccess]);


  return (
    <div>
      <h1> ALL Creator</h1>
      <div>
        {allCreterwithSubStatus.map((subscription, index) => (
          <div key={index} style={{ display: 'inline-block', margin: '0 10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={img} alt="Creator" style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
              <div>{subscription.name}</div>
              <div>Subscribers: {subscription.subscribers.length}</div>
              {subscription.isSubscribed ? (
                 <Button variant="danger" onClick={() => handleUnsubscribe(subscription._id)} disabled={loading}>
                 {loading ? <Spinner animation="border" size="sm" /> : 'Unsubscribe'} 
               </Button>
                // <button onClick={()=>handleUnsubscribe(subscription._id)}>Unsubscribe</button>
              ) : (
                <Button variant="primary" onClick={() => handleSubscribe(subscription._id)} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Subscribe'} 
              </Button>
                // <button onClick={()=>handleSubscribe(subscription._id)}>Subscribe</button>
                )}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ALLCreater