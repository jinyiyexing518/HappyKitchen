import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card, List, Divider, Row, Col } from "antd";
import { Input, Button, Spin } from 'antd';
const { Search } = Input;

export default function Nowplaying(props) {
  const [list, setList] = useState([]);
  const [meat, setMeat] = useState([]);
  const [vegetable, setVegetable] = useState([]);

  useEffect(() => {
    axios.get("/test.json").then((res) => {
      console.log(res.data.data.products);
      setList(res.data.data.products);
    });
  }, []);

  useEffect(() => {
    axios.get("/meatDish.json").then((res) => {
      // console.log(res.data.data.products)
      setMeat(res.data.data.products);
    });
  }, []);

  useEffect(() => {
    axios.get("/vegetableDish.json").then((res) => {
      // console.log(res.data.data.products)
      setVegetable(res.data.data.products);
    });
  }, []);

  const history = useHistory();

  const onChangePage = (id) => {
    console.log("click");
    // window.location.href("#/detail/" + id)
    // props.history.push(`/detail/${id}`)  //因为这个子组件是放在路由下面，所以是路由的子组件，可以通过props调用路由状态属性方法等
    // 1.动态路由传参
    history.push(`/detail/${id}`);
    // 2.query传参
    // history.push({pathname: '/detail', query: {id: id}})
  };

  const onSearch = async (value, _e, info) => {
    console.log(info?.source, value);
    setSearching(true);
    await axios({
      method: "Get",
      url: "http://localhost:5120/SemanticKernel/GetSemanticKernelResult/",
      params: {
        name: value,
      },
    })
      .then((res) => {
        console.log(res.data);
        setSearchResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      setSearching(false);
  }

  const onChangeSearchDish = (e) => {
    setSearchResult([]);
    setSearchDish(e.target.value);
  }

  const [searchDish, setSearchDish] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [searching, setSearching] = useState(false); // 是否正在搜索

  // Add to favourite in Session Storage
  const favourite = () => {
    if(!searchResult || searchResult.length === 0){
      alert("收藏失败");
      return;
    }
    let favourite = {
      name: searchDish,
      introduction: searchResult.split("简介：")[1].split("食材：")[0].trim(),
      material: searchResult.split("食材：")[1].split("做法：")[0].trim(),
      method: searchResult.split("做法：")[1].split("注意事项：")[0].trim(),
      attention: searchResult.split("注意事项：")[1].trim()
    };
    let favouriteList = JSON.parse(sessionStorage.getItem("favourite")) || [];
    favouriteList.push(favourite);
    sessionStorage.setItem("favourite", JSON.stringify(favouriteList));
    console.log(favouriteList);
    alert("收藏成功");
  }

  return (
    <div>
      <Search placeholder="输入需要查询的菜谱" onSearch={onSearch} enterButton style={{marginTop: "20px", marginLeft: "20px", width: 304}} onChange={onChangeSearchDish}/>
      <Button type="primary" style={{marginTop: "20px", marginLeft: "10px"}} onClick={favourite}>
        {"收藏"}
      </Button>
      {searching ? <Spin size="large">正在搜索菜谱</Spin> : <></>}
      {searchDish && searchResult && searchResult.length > 0 ? 
        <div>
          {/* <div>
            <h3>简介：</h3>
            {searchResult ? (
              searchResult.split("简介：")[1].split("食材：")[0].trim().split("\n").map((item, index) => {
                return (
                  <p key={index}>
                    {"\u00A0\u00A0"}
                    {item}
                  </p>
                );
              })
            ) : <Spin size="large">Click Detail Button and Wait</Spin>}  
          </div>
          <div>
            <h3>食材：</h3>
              {searchResult ? (
                searchResult
                  .split("食材：")[1]
                  .split("做法：")[0]
                  .trim()
                  .split("\n")
                  .map((item, index) => {
                    return (
                      <p key={index}>
                        {"\u00A0\u00A0"}
                        {item}
                      </p>
                    );
                  })
              ) : (
                <Spin size="large">Click Detail Button and Wait</Spin>
              )}
          </div>
          <div>
            <h3>做法：</h3>
            {searchResult ? (
              searchResult
                .split("做法：")[1]
                .split("注意事项：")[0]
                .trim()
                .split("\n")
                .map((item, index) => {
                  return (
                    <p key={index}>
                      {"\u00A0\u00A0"}
                      {item}
                    </p>
                  );
                })
            ) : (
              <Spin size="large">Click Detail Button and Wait</Spin>
            )}
          </div>
          <div>
            <h3>注意事项：</h3>
            {searchResult ? (
              searchResult
                .split("注意事项：")[1]
                .trim()
                .split("\n")
                .map((item, index) => {
                  return (
                    <p key={index}>
                      {"\u00A0\u00A0"}
                      {item}
                    </p>
                  );
                })
            ) : (
              <Spin size="large">Click Detail Button and Wait</Spin>
            )}
          </div> */}
          {/* 使用List展示详细信息 */}
          <List grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1, }}>
                <List.Item>
                  <Card title="简介：">
                    {searchResult ? (searchResult
                    .split("简介：")[1]
                    .split("食材：")[0]
                    .trim()
                    .split("\n")
                    .map((item, index) => {
                      return (
                        <p key={index}>
                          {"\u00A0\u00A0"}
                          {item}
                        </p>
                      );
                    })
                  ) : (
                    <Spin size="large">Click Detail Button and Wait</Spin>
                  )}
                </Card>
                <Card title="食材：">
                    {searchResult ? (searchResult
                    .split("食材：")[1]
                    .split("做法：")[0]
                    .trim()
                    .split("\n")
                    .map((item, index) => {
                      return (
                        <p key={index}>
                          {"\u00A0\u00A0"}
                          {item}
                        </p>
                      );
                    })
                  ) : (
                    <Spin size="large">Click Detail Button and Wait</Spin>
                  )}
                </Card>

                <Card title="做法：">
                    {searchResult ? (searchResult
                    .split("做法：")[1]
                    .split("注意事项：")[0]
                    .trim()
                    .split("\n")
                    .map((item, index) => {
                      return (
                        <p key={index}>
                          {"\u00A0\u00A0"}
                          {item}
                        </p>
                      );
                    })
                  ) : (
                    <Spin size="large">Click Detail Button and Wait</Spin>
                  )}
                </Card>

                <Card title="注意事项：">
                {searchResult ? (
                  searchResult
                    .split("注意事项：")[1]
                    .trim()
                    .split("\n")
                    .map((item, index) => {
                      return (
                        <p key={index}>
                          {"\u00A0\u00A0"}
                          {item}
                        </p>
                      );
                    })
                ) : (
                  <Spin size="large">Click Detail Button and Wait</Spin>
                )}
                </Card>
                </List.Item>
            </List>
        </div>
      : <></>}
      <Divider>
        <h2 style={{ color: "blue" }}>荤菜</h2>
      </Divider>
      {
        // meat.map((item, index) => (
        //   <div key={item.productId} onClick={() => onChangePage(item.productId)}>
        //     <Divider orientation="left" orientationMargin="200px">
        //       <h3>{item.name}</h3>
        //     </Divider>
        //     <img
        //       src={item.poster}
        //       alt={item.name}
        //       style={{ height: "300px", width: "450px" }}
        //       className="img"
        //     />
        //   </div>
        // ))
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
            xxl: 1,
          }}
          dataSource={meat}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <Divider orientationMargin="200px">
                    <h3>{item.name}</h3>
                  </Divider>
                }
              >
                <div
                  key={item.productId}
                  onClick={() => onChangePage(item.productId)}
                >
                  <Row>
                    <Col>
                      <img
                        src={item.poster}
                        alt={item.name}
                        style={{ height: "300px", width: "450px" }}
                        className="img"
                      />
                    </Col>
                    <Col>
                      <div style={{marginLeft: "100px"}}><h3>简介：</h3>{"\u00A0\u00A0"}{item.synopsis}</div>
                      <div style={{marginLeft: "100px"}}><h3>菜种：</h3>{"\u00A0\u00A0"}{item.category}</div>
                      <div style={{marginLeft: "100px"}}><h3>余量：</h3>{"\u00A0\u00A0"}{item.num}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </List.Item>
          )}
        />
      }
      <Divider>
        <h2 style={{ color: "blue" }}>素菜</h2>
      </Divider>
      {
        // vegetable.map((item, index) => (
        //   <div key={item.productId} onClick={() => onChangePage(item.productId)}>
        //     <Divider orientation="left" orientationMargin="200px">
        //       <h3>{item.name}</h3>
        //     </Divider>
        //     <img
        //       src={item.poster}
        //       alt={item.name}
        //       style={{ height: "300px", width: "450px" }}
        //       className="img"
        //     />
        //   </div>
        // ))
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
            xxl: 1,
          }}
          dataSource={vegetable}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <Divider orientationMargin="200px">
                    <h3>{item.name}</h3>
                  </Divider>
                }
              >
                <div
                  key={item.productId}
                  onClick={() => onChangePage(item.productId)}
                >
                  <Row>
                    <Col>
                      <img
                        src={item.poster}
                        alt={item.name}
                        style={{ height: "300px", width: "450px" }}
                        className="img"
                      />
                    </Col>
                    <Col>
                      <div style={{marginLeft: "100px"}}><h3>简介：</h3>{"\u00A0\u00A0"}{item.synopsis}</div>
                      <div style={{marginLeft: "100px"}}><h3>菜种：</h3>{"\u00A0\u00A0"}{item.category}</div>
                      <div style={{marginLeft: "100px"}}><h3>余量：</h3>{"\u00A0\u00A0"}{item.num}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </List.Item>
          )}
        />
      }
      <Divider />
    </div>
  );
}
