import axios from "axios";
import config from "../../../config";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
// import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const GetAllOrdersToBeDelivered = () => {
  const [ordersToBeDeliverList, setOrdersToBeDeliverList] = useState([]);
  const [deliveryBoyList, setDeliveryBoyList] = useState([]);
  const branchId = sessionStorage.getItem("branchId");
  const token = sessionStorage.getItem("token");
  // const navigate = useNavigate();
  if (token != null)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  useEffect(() => {
    couriers();
  }, []);

  const couriers = () => {
    axios
      .get(
        config.serverURL + `/branchadmin/getallintransitcouriers/${branchId}`
      ) //hardcoded value
      .then((response) => {
        console.log(response);
        setOrdersToBeDeliverList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListOfDeliveryBoys = () => {
    console.log(branchId);
    axios
      .get(config.serverURL + `/branchadmin/allotdeliveryboy/${branchId}`) //hardcoded value
      .then((response) => {
        console.log(response);
        setDeliveryBoyList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setDeliveryBoy = (dboyid, courierId) => {
    axios
      .put(
        config.serverURL +
          `/branchadmin/allotdeliveryboy/${courierId}/${dboyid}`
      )
      .then((response) => {
        console.log(response);
        // setDeliveryBoyId(response.data);
        console.log("success");
        toast.success("successfully alloted to emp Id " + dboyid);
        // navigate("/branchadmin/getAllOrdersToBePickedUp");
        var newList = ordersToBeDeliverList.filter((c) => courierId !== c.id);
        setOrdersToBeDeliverList(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <br />
      <div className="text-center">
        <div className="">COURIERS TO BE DELIVERED</div>
      </div>
      <br />
      <div className="panel">
        <div className="text-center">
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>courier Id</th>
                <th>Sender Address</th>
                <th>Sender Pincode</th>
                <th>Receiver Name</th>
                <th>Receiver Address</th>
                <th>Receiver Pincode</th>
                <th>Category</th>
                <th>Weight</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Alot To Delivery Boy</th>
              </tr>
            </thead>
            {ordersToBeDeliverList.map((list) => {
              return (
                <tbody>
                  <tr>
                    <td>{list.id}</td>
                    <td>
                      {list.customer.customerAddress.building}{" "}
                      {list.customer.customerAddress.landmark}{" "}
                      {list.customer.customerAddress.city}
                    </td>
                    <td>{list.customer.customerAddress.pincode}</td>
                    <td>{list.receiver.receiverName}</td>
                    <td>
                      {list.receiver.receiverAddress.building}
                      {list.receiver.receiverAddress.landmark}
                      {list.receiver.receiverAddress.city}
                    </td>
                    <td>{list.receiver.receiverAddress.pincode}</td>
                    <td>{list.courierCategory}</td>
                    <td>{list.courierWeight}</td>
                    <td>{list.courierAmount}</td>
                    <td>{list.courierStatus}</td>
                    <td>
                      <Button
                        type="button"
                        style={styles.button}
                        onClick={getListOfDeliveryBoys}>
                        Delivery Boy{" "}
                      </Button>
                      {deliveryBoyList.map((list1) => {
                        return (
                          <table>
                            <tr>
                              <td>{list1.empName}</td>
                              <td>
                                <button
                                  className="btn btn-warning"
                                  onClick={() =>
                                    setDeliveryBoy(list1.id, list.id)
                                  }>
                                  Alot
                                </button>
                              </td>
                            </tr>
                          </table>
                        );
                      })}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
      <div>
        <button className="btn btn-primary">
          <Link
            className="text-decoration-none text-dark"
            to="/branchadmin/branchAdminHome">
            BACK
          </Link>
        </button>
      </div>
    </div>
  );
};

const styles = {
  button: {
    position: "relative",
    width: 250,
    height: 40,
    backgroundColor: "#db0f62",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
};

export default GetAllOrdersToBeDelivered;
