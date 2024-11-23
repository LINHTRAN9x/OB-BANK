import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { FaBell, FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";
import { Select, Space,Avatar, Badge, List, Button, Popover, } from 'antd';
import { GoDotFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
    const [openCollapse, setOpenCollapse] = useState(8);
    const [selectedLang, setSelectedLang] = useState("en");
    const [user,setUser] = useState({});
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
 



  
    

    const _getNotifications = async () => {
      const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
        const jwt = data ? data.jwt : null;
      try {
        const rs = await axios.get("https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Notification/get-notifications",{
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
       
        setNotifications(rs.data.result.data)
        
      } catch (error) {
        
        navigate('/auth/log-in'); 
      }
    }
    useEffect(() => {
      setUnreadCount(notifications.filter((notification) => !notification.isRead).length);
    }, [notifications]);

    //btn all read
    const markAllAsRead = () => {
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({ ...notification, read: true }))
      );
      setUnreadCount(0);
    };

    //mark read on click
    const handleNotificationClick = async (id) => {
      const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
      const jwt = data ? data.jwt : null;
      try {
        // Call the API to mark the notification as read
        await axios.put(`https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/Notification/mark-as-read/${id}`,{},{
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
    
        // If the API call is successful, update the notification status in local state
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.notificationId === id ? { ...notification, isRead: true } : notification
          )
        );
        
        // Decrease unread count
        setUnreadCount((prevCount) =>
          notifications.find((notification) => notification.notificationId === id && !notification.isRead)
            ? Math.max(0, prevCount - 1)
            : prevCount
        );
      } catch (error) {
      
      
      }
    };

    const handleLogout = (e) => {
      e.preventDefault();
      localStorage.removeItem("state"); 
      localStorage.removeItem("jwt"); 
      navigate("/auth/log-in")
    };


    const handleChange = (value) => {
      setSelectedLang(value);
    };

    const toggleCollapse = (index) => {
        setOpenCollapse(openCollapse === index ? null : index); // If already open, close it, else open it
       
      };

    useEffect(() => {
      _getNotifications();
    },[]);  

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3/$2/$1');
    };


    const [visibleNotifications, setVisibleNotifications] = useState(5); // Initial number of notifications to display

    const loadMoreNotifications = () => {
      setVisibleNotifications((prev) => prev + 5); // Load 5 more notifications
    };
    
    const notificationContent = (
      <List
        style={{
          maxHeight: "400px", // Limit the height of the list
          overflowY: "auto", // Allow vertical scrolling
          width: "100%", // Contain width within the container
        }}
        dataSource={notifications.slice(0, visibleNotifications)} // Display only the visible notifications
        renderItem={(item, index) => (
          <List.Item onClick={() => handleNotificationClick(item.notificationId)}>
            <div
              className="notification-menu"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "400px",
              }}
            >
              <span>
                {!item.isRead && <GoDotFill color="blue" fontSize={17} />} {item.content.replace(/Account: (\d{9})(\d{3})/, "Account: *********$2")}
              </span>
              <span style={{ fontSize: "12px", color: "#888" }}>
            {formatDate(item.createdAt)}
              </span>
            </div>
          </List.Item>
        )}
        footer={
          <div style={{ textAlign: "center", marginTop: "12px" }}>
            {visibleNotifications < notifications.length ? (
              <Button onClick={loadMoreNotifications}>
                Load more
              </Button>
            ) : (
              <span>No more notifications</span>
            )}
          </div>
        }
      />
    );


      const _getUser = async () => {
        const url = `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net/api/User/get-detail-User`;
        
       
        const data = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : null;
        const jwt = data ? data.jwt : null;
    
        if (jwt) { 
          try {
            const rs = await axios.get(url, {
              headers: {
                'Authorization': `Bearer ${jwt}`
              }
            });
            
            setUser(rs.data);
      
           
          } catch (err) {
            
          
          }
        }
      };
      useEffect(() => {
        _getUser();
      },[]);
    return (
        <>
            <header className="d-block">
        <nav
                    _ngcontent-wkl-c174=""
                    fxlayout="row"
                    fxlayoutalign="space-between center"
                    className="navbar fixed-top flex-md-nowrap"
                    style={{
                      flexDirection: "row",
                      boxSizing: "border-box",
                      display: "flex",
                      placeContent: "center space-between",
                      alignItems: "center",
                    }}
                  >
                  
                    <div
                      _ngcontent-wkl-c174=""
                      fxlayout="row"
                      fxlayoutalign="space-between center"
                      className="brand-lg"
                      style={{
                        flexDirection: "row",
                        boxSizing: "border-box",
                        display: "flex",
                        placeContent: "center space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        _ngcontent-wkl-c174=""
                        className="navbar-brand d-none d-md-flex d-sm-none"
                      >
                        <img
                          _ngcontent-wkl-c174=""
                          src="/images/logo_mbbank_3.svg"
                          className="img-fluid"
                          tabIndex={0}
                        />
                      </div>
                      <div _ngcontent-wkl-c174="" className="user-information">
                        <div _ngcontent-wkl-c174="">
                          <div _ngcontent-wkl-c174="" className="welcome-back">
                            {" "}
                            Welcome back{" "}
                          </div>
                          <span _ngcontent-wkl-c174="" className="name-css text-uppercase">
                            {user.name}
                          </span>
                          <div
                            _ngcontent-wkl-c174=""
                            className="member-class ng-star-inserted"
                          >
                            <span _ngcontent-wkl-c174="" className="tbl-tx-1">
                            Member loyalty point{" "}
                              <span _ngcontent-wkl-c174=""> :</span>
                              <span _ngcontent-wkl-c174="" className="tbl-tx-2">
                                {" "}
                                0
                              </span>
                            </span>
                            <img
                              _ngcontent-wkl-c174=""
                              width={25}
                              src="https://img.icons8.com/fluency/48/cheap-2--v1.png"
                            />
                          </div>
                          {/**/}
                        </div>
                      </div>
                    </div>
                    <div _ngcontent-wkl-c174="" className="navbar-main">
                      <div _ngcontent-wkl-c174="" className="row h-100">
                        <div
                          _ngcontent-wkl-c174=""
                          className="user-controls d-flex align-items-center"
                        >
                          <div
                            _ngcontent-wkl-c174=""
                            fxlayout="row"
                            fxlayoutalign="end center"
                            className="controls pds-4 jctt"
                            style={{
                              flexDirection: "row",
                              boxSizing: "border-box",
                              display: "flex",
                              placeContent: "center flex-end",
                              alignItems: "center",
                            }}
                          >
                            
    
    
   
      
    

                            
                            <div
                              _ngcontent-wkl-c174=""
                              fxlayout="row"
                              fxlayoutalign="end center"
                              className="language-user"
                              style={{
                                flexDirection: "row",
                                boxSizing: "border-box",
                                display: "flex",
                                placeContent: "center flex-end",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              <div className="notifications">
                              <Popover 
                                content={notificationContent} 
                                title="Notifications" 
                                trigger="click" 
                                //onVisibleChange={markAsRead}
                              >
                                <Badge size="small" count={unreadCount}>
                                  <FaBell color="blue" fontSize="1.2rem" />
                                </Badge>
                              </Popover>
                              </div>
                              
                              <div _ngcontent-wkl-c174="" className="language_">
                                
                              <Space wrap>
                              <Select
                                defaultValue="en"
                                style={{
                                  width: "auto",
                                }}
                                onChange={handleChange}
                                value={selectedLang}
                                title="Select Language"
                                options={[
                                  {
                                    value: 'en',
                                    label: (
                                      <span>
                                        <img
                                          src="/images/64px-Flag_of_the_United_Kingdom.png"
                                          alt="UK Flag"
                                          style={{ width: 20, marginRight: 8 }}
                                        />
                                        EN
                                      </span>
                                    ),
                                  },
                                  {
                                    value: "vn",
                                    label: (
                                      <span>
                                        <img
                                          src="/images/flag_vn.webp"
                                          alt="VN Flag"
                                          style={{ width: 20, marginRight: 8 }}
                                        />
                                        VN
                                      </span>
                                    ),
                                  },
                                 
                                  
                                ]} />
                              </Space>
                                {/**/}
                                <mat-menu
                                  _ngcontent-wkl-c174=""
                                  matmenu=""
                                  className="ng-star-inserted"
                                >
                                  {/**/}
                                </mat-menu>
                              </div>
                              <div _ngcontent-wkl-c174="" className="user-icon">
                                <button
                                  _ngcontent-wkl-c174=""
                                  aria-haspopup="true"
                                  mat-button=""
                                  fxlayout="row"
                                  fxlayoutalign="center center"
                                  className="mat-focus-indicator mat-menu-trigger mat-button mat-button-base"
                                  style={{
                                    flexDirection: "row",
                                    boxSizing: "border-box",
                                    display: "flex",
                                    placeContent: "center",
                                    alignItems: "center",
                                  }}
                                  onClick={() => toggleCollapse(5)}
                                  aria-controls="user-colapse"
                                  aria-expanded={openCollapse === 5}
                                >
                                  <span className="mat-button-wrapper">
                                    <div
                                      _ngcontent-wkl-c174=""
                                      fxlayout="row"
                                      fxlayoutalign="space-between center"
                                      className="user_icon"
                                      style={{
                                        flexDirection: "row",
                                        boxSizing: "border-box",
                                        display: "flex",
                                        placeContent: "center space-between",
                                        alignItems: "center",
                                        width: "40px",
                                      }}
                                    >
                                      <span
                                        _ngcontent-wkl-c174=""
                                        role="img"
                                        className=""
                                        aria-hidden="true"
                                        data-mat-icon-type="font"
                                      >
                                        <FaUserCircle />
                                      </span>
                                      <span
                                        _ngcontent-wkl-c174=""
                                        role="img"
                                        className=""
                                        aria-hidden="true"
                                        data-mat-icon-type="font"
                                      >
                                        {openCollapse === 5 ? <FaChevronUp /> : <FaChevronDown />}
                                      </span>
                                      {/**/}
                                      {/**/}
                                    </div>
                                  </span>
                                  <Collapse in={openCollapse === 5}>
                                        <div id="user-colapse">
                                        <div
                                           
                                            className="cdk-overlay-pane"
                                           
                                            >
                                          
                                                <div className="mat-menu-content ng-tns-c100-16">
                                                <a
                                                  
                                                  
                                                   
                                                    className="mat-focus-indicator mat-menu-item ng-tns-c100-16"
                                                    href="/auth/forgot-password"
                                                
                                              
                                                >
                                                    {" "}
                                                    Change password <div matripple="" className="mat-ripple mat-menu-ripple" />
                                                    {/**/}
                                                </a>
                                                
                                                <button
                                                   
                                            
                                                    className="mat-focus-indicator mat-menu-item ng-tns-c100-16"
                                               
                                  
                                            
                                                >
                                                    <span onClick={handleLogout}> 
                                                      Log out 
                                                    </span>
                                                    <div matripple="" className="mat-ripple mat-menu-ripple" />
                                                    {/**/}
                                                </button>
                                                </div>
                                          
                                            </div>


                                        </div>
                                   </Collapse>
                                  <span
                                    matripple=""
                                    className="mat-ripple mat-button-ripple"
                                  />
                                  <span className="mat-button-focus-overlay" />
                                </button>
                                {/**/}
                                <mat-menu
                                  _ngcontent-wkl-c174=""
                                  className="ng-tns-c100-4 ng-star-inserted"
                                >
                                  {/**/}
                                </mat-menu>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div _ngcontent-wkl-c174="" />
                      </div>
                    </div>
                  </nav>
        </header>
        </>
    )
}
export default Header;