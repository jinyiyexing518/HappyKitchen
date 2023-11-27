import { React, useState } from "react";
import Title from "./Title";
import { Alert, Button, List, Card, Divider } from "antd";
import { withRouter } from "react-router-dom";

function Center(props) {
  const [favouriteList, setFavouriteList] = useState([]);

  const showFavouriteList = () => {
    let favourites = JSON.parse(sessionStorage.getItem("favourite"));
    // filter the same name in favourites
    let newFavourites = [];
    for (let i = 0; i < favourites.length; i++) {
      let flag = true;
      for (let j = 0; j < newFavourites.length; j++) {
        if (favourites[i].name === newFavourites[j].name) {
          flag = false;
          break;
        }
      }
      if (flag) {
        newFavourites.push(favourites[i]);
      }
    }
    favourites = newFavourites;
    setFavouriteList(favourites);
    setDisplayFavourite(true);
  };

  const unShowFavouriteList = () => {
    setFavouriteList([]);
    setDisplayFavourite(false);
  };

  // read the favouriteList from local storage
  // useEffect(() => {
  //   let favouriteList = JSON.parse(localStorage.getItem("favouriteList"));
  //   setFavouriteList(favouriteList);
  // }, [favouriteList]);

  const [dispalyFavourite, setDisplayFavourite] = useState(false);

  const unfavourite = (name) => {
    // delete the item from favouriteList in sessionStorage by name
    return () => {
      let favouriteList = JSON.parse(sessionStorage.getItem("favourite"));
      let newFavouriteList = favouriteList.filter((item) => {
        return item.name !== name;
      });
      sessionStorage.setItem("favourite", JSON.stringify(newFavouriteList));
      setFavouriteList(newFavouriteList);
    }
  }

  return (
    <div>
      <Title text="个人信息" />
      {/* 居中 */}
      <br />
      <Alert
        message="欢迎登录"
        type="success"
        style={{ textAlign: "center" }}
      />
      <br />
      <Alert
        message="账号信息"
        type="warning"
        style={{ textAlign: "center" }}
      />
      <div>
        {/* get userName from cookies */}
        <h4 style={{ textAlign: "left" }}>
          账号：{document.cookie.split(";")[0].split("=")[1]}
        </h4>
      </div>
      <br />
      <Alert
        message="菜谱收藏夹"
        type="success"
        style={{ textAlign: "center" }}
      />
      <Button type="primary" onClick={dispalyFavourite? unShowFavouriteList: showFavouriteList} style={{marginLeft: "1050px"}}>{dispalyFavourite? "关闭列表": "展开列表"}</Button>
      {/* 使用antd的List组件展示loacl-storage中存储的favourite详细信息 */}
      <List grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1, }}>
        {/* 使用map渲染favouriteList */}
        {favouriteList && favouriteList.length>0 && favouriteList.map((item, index) => {
          return (
            <>
              <List.Item index={index}>
                <Card title={<h3 style={{color: "red"}}>{item.name}</h3>}>
                  <Button type="primary" onClick={unfavourite(item.name)}>取消收藏</Button>
                </Card>
                <Card title="简介：">
                  {item.introduction}
                </Card>
                <Card title="食材：">
                  {item.material}
                </Card>
                <Card title="做法：">
                  {item.method}
                </Card>
                <Card title="注意事项：">
                  {item.attention}
                </Card>
              </List.Item>
            </>
          );
        })}
      </List>
      <br />

      {/* delete userName and password from cookies */}
      {/* 组件居中 */}
      <Button
        type="primary"
        style={{
          textAlign: "center",
          width: "100px",
          position: "absolute",
          left: "50%",
          marginLeft: "-50px",
        }}
        onClick={() => {
          // delete userName and password from cookies
          document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

          // wait for 0.5 second and redirect to login page
          props.history.push("/Load");
          setTimeout(() => {
            props.history.push("/login");
          }, 500);
        }}
      >
        退出登录
      </Button>
    </div>
  );
}

export default withRouter(Center);
