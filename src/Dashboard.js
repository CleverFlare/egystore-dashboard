import {
  Tabs,
  Tab,
  Form,
  Container,
  InputGroup,
  Row,
  Col,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { useState, useReducer, useEffect } from "react";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteField,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore();

const colRef = collection(db, "categories");

const ACTIONS = {
  SET_NAME: "add-name",
  SET_PRICE: "add-price",
  SET_DETAILS: "add-details",
  CHOOSE_CATEGORY: "choose-category",
  CHOOSE_RATE: "choose-rate",
  ADD_COLOR: "add-color",
  REMOVE_COLOR: "remove-color",
  ADD_SIZE: "add-size",
  REMOVE_SIZE: "remove-size",
  SET_PICTURE1: "add-picture-1",
  SET_PICTURE2: "add-picture-2",
  SET_PICTURE3: "add-picture-3",
  SET_PICTURE4: "add-picture-4",
  SET_PICTURE5: "add-picture-5",
  SET_SPECIAL: "special-product",
  CHOOSE_BRAND: "choose-brand",
  UPDATE_ID: "update-id",
  UPDATE_NAME: "update-name",
  UPDATE_PRICE: "update-price",
  UPDATE_DETAILS: "update-details",
  UPDATE_CATEGORY: "update-category",
  UPDATE_RATE: "update-rate",
  UPDATE_BRAND: "update-brand",
  UPDATE_ADD_COLOR: "update-add-color",
  UPDATE_REMOVE_COLOR: "update-remove-color",
  UPDATE_SET_COLORS: "update-set-colors",
  UPDATE_ADD_SIZE: "update-add-size",
  UPDATE_REMOVE_SIZE: "update-remove-size",
  UPDATE_SET_SIZES: "update-set-sizes",
  UPDATE_SPECIAL: "update-remove-size",
  UPDATE_PICTURE1: "update-picture-1",
  UPDATE_PICTURE2: "update-picture-2",
  UPDATE_PICTURE3: "update-picture-3",
  UPDATE_PICTURE4: "update-picture-4",
  UPDATE_PICTURE5: "update-picture-5",
  UPDATE_IS_SPECIAL: "update-is-special",
  RESET: "reset",
};

const init = {
  name: "",
  price: "",
  rate: 1,
  details: "",
  category: "mobiles",
  picture1: "",
  picture2: "",
  picture3: "",
  picture4: "",
  picture5: "",
  colors: [],
  sizes: [],
  brand: "null",
  isSpecial: false,
  updateID: "",
  updateName: "",
  updatePrice: "",
  updateRate: 1,
  updateDetails: "",
  updateCategory: "mobiles",
  updatePicture1: "",
  updatePicture2: "",
  updatePicture3: "",
  updatePicture4: "",
  updatePicture5: "",
  updateColors: [],
  updateSizes: [],
  updateBrand: "null",
  updateIsSpecial: false,
};

function stateReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_NAME:
      return { ...state, name: action.payload };

    case ACTIONS.SET_PRICE:
      return { ...state, price: action.payload };

    case ACTIONS.SET_DETAILS:
      return { ...state, details: action.payload };

    case ACTIONS.CHOOSE_CATEGORY:
      return { ...state, category: action.payload };

    case ACTIONS.CHOOSE_RATE:
      return { ...state, rate: action.payload };

    case ACTIONS.ADD_COLOR:
      return { ...state, colors: [...state.colors, action.payload] };

    case ACTIONS.REMOVE_COLOR:
      return {
        ...state,
        colors: state.colors.filter((item) => item !== action.payload),
      };

    case ACTIONS.ADD_SIZE:
      return { ...state, sizes: [...state.sizes, action.payload] };

    case ACTIONS.REMOVE_SIZE:
      return {
        ...state,
        sizes: state.sizes.filter((item) => item !== action.payload),
      };

    case ACTIONS.SET_PICTURE1:
      return { ...state, picture1: action.payload };

    case ACTIONS.SET_PICTURE2:
      return { ...state, picture2: action.payload };

    case ACTIONS.SET_PICTURE3:
      return { ...state, picture3: action.payload };

    case ACTIONS.SET_PICTURE4:
      return { ...state, picture4: action.payload };

    case ACTIONS.SET_PICTURE5:
      return { ...state, picture5: action.payload };

    case ACTIONS.SET_SPECIAL:
      return { ...state, isSpecial: !state.isSpecial };

    case ACTIONS.CHOOSE_BRAND:
      if (action.payload === "null") {
        return { ...state, brand: null };
      } else {
        return { ...state, brand: action.payload };
      }

    case ACTIONS.UPDATE_ID:
      return { ...state, updateID: action.payload };

    case ACTIONS.UPDATE_NAME:
      return { ...state, updateName: action.payload };

    case ACTIONS.UPDATE_PRICE:
      return { ...state, updatePrice: action.payload };

    case ACTIONS.UPDATE_DETAILS:
      return { ...state, updateDetails: action.payload };

    case ACTIONS.UPDATE_RATE:
      return { ...state, updateRate: action.payload };

    case ACTIONS.UPDATE_CATEGORY:
      return { ...state, updateCategory: action.payload };

    case ACTIONS.UPDATE_PICTURE1:
      return { ...state, updatePicture1: action.payload };

    case ACTIONS.UPDATE_PICTURE2:
      return { ...state, updatePicture2: action.payload };

    case ACTIONS.UPDATE_PICTURE3:
      return { ...state, updatePicture3: action.payload };

    case ACTIONS.UPDATE_PICTURE4:
      return { ...state, updatePicture4: action.payload };

    case ACTIONS.UPDATE_PICTURE5:
      return { ...state, updatePicture5: action.payload };

    case ACTIONS.UPDATE_ADD_COLOR:
      return {
        ...state,
        updateColors: [...state.updateColors, action.payload],
      };

    case ACTIONS.UPDATE_REMOVE_COLOR:
      return {
        ...state,
        updateColors: state.updateColors.filter(
          (item) => item !== action.payload
        ),
      };

    case ACTIONS.UPDATE_ADD_SIZE:
      return { ...state, updateSizes: [...state.updateSizes, action.payload] };

    case ACTIONS.UPDATE_REMOVE_SIZE:
      return {
        ...state,
        updateSizes: state.updateSizes.filter(
          (item) => item !== action.payload
        ),
      };

    case ACTIONS.UPDATE_BRAND:
      return { ...state, updateBrand: action.payload };

    case ACTIONS.UPDATE_SPECIAL:
      return { ...state, updateIsSpecial: !state.updateIsSpecial };

    case ACTIONS.UPDATE_SET_SIZES:
      return {
        ...state,
        updateSizes: action.payload,
      };

    case ACTIONS.UPDATE_SET_COLORS:
      return {
        ...state,
        updateColors: action.payload,
      };

    case ACTIONS.UPDATE_IS_SPECIAL:
      return {
        ...state,
        updateIsSpecial: action.payload,
      };

    case ACTIONS.RESET:
      return init;

    default:
      return state;
  }
}

const Dashboard = () => {
  const [state, dispatch] = useReducer(stateReducer, init);
  const [delname, setDelname] = useState("");
  const [delcategory, setDelcategory] = useState("mobiles");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const [onsale, setOnsale] = useState([]);
  const [bestseller, setBestseller] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);

  const [onsaleID, setOnsaleID] = useState("");
  const [onsaleCategory, setOnsaleCategory] = useState("mobiles");

  const [bestsellerID, setBestsellerID] = useState("");
  const [bestsellerCategory, setBestsellerCategory] = useState("mobiles");

  const [featuredID, setFeaturedID] = useState("");
  const [featuredCategory, setFeaturedCategory] = useState("mobiles");

  const [trendingID, setTrendingID] = useState("");
  const [trendingCategory, setTrendingCategory] = useState("mobiles");

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      setBestseller([]);
      setOnsale([]);
      setFeatured([]);
      setTrending([]);
      snapshot.forEach((doc) => {
        const docID = doc.id;
        const bestsellerItems = Object.keys(doc.data()).filter((item) => {
          return doc.data()[item].bestseller === true;
        });
        bestsellerItems.forEach((item) => {
          const product = doc.data()[item];
          product.category = docID;
          product.ID = item;
          setBestseller((oldArray) => [...oldArray, product]);
        });

        const onsaleItems = Object.keys(doc.data()).filter((item) => {
          return doc.data()[item].onsale === true;
        });
        onsaleItems.forEach((item) => {
          const product = doc.data()[item];
          product.category = docID;
          product.ID = item;
          setOnsale((oldArray) => [...oldArray, product]);
        });

        const featuredItems = Object.keys(doc.data()).filter((item) => {
          return doc.data()[item].featured === true;
        });
        featuredItems.forEach((item) => {
          const product = doc.data()[item];
          product.category = docID;
          product.ID = item;
          setFeatured((oldArray) => [...oldArray, product]);
        });

        const trendingItems = Object.keys(doc.data()).filter((item) => {
          return doc.data()[item].trending === true;
        });
        trendingItems.forEach((item) => {
          const product = doc.data()[item];
          product.category = docID;
          product.ID = item;
          setTrending((oldArray) => [...oldArray, product]);
        });
      });
    });
  }, []);

  const handleDeleteBookmark = (category, id, setter) => {
    const docRef = doc(db, "categories", `${category}`);
    getDoc(docRef).then((snapshot) => {
      const dataChange = { [id]: { ...snapshot.data()[id], [setter]: false } };
      updateDoc(docRef, dataChange);
    });
  };

  const handleAddBookmark = (category, id, setter) => {
    const docRef = doc(db, "categories", `${category}`);
    getDoc(docRef).then((snapshot) => {
      console.log(snapshot.data()[id]);
      const dataChange = { [id]: { ...snapshot.data()[id], [setter]: true } };
      updateDoc(docRef, dataChange);
    });
  };

  const handleSetColors = (event) => {
    if (event.target.checked) {
      dispatch({ type: ACTIONS.ADD_COLOR, payload: event.target.value });
    } else {
      dispatch({ type: ACTIONS.REMOVE_COLOR, payload: event.target.value });
    }
  };

  const handleSetSizes = (event) => {
    if (event.target.checked) {
      dispatch({ type: ACTIONS.ADD_SIZE, payload: event.target.value });
    } else {
      dispatch({ type: ACTIONS.REMOVE_SIZE, payload: event.target.value });
    }
  };

  const handleSubmitNew = (event) => {
    event.preventDefault();
    const docRef = doc(db, "categories", `${state.category}`);
    updateDoc(docRef, {
      [uuidv4()]: {
        name: state.name,
        price: state.price,
        details: state.details,
        rate: state.rate,
        image: [
          state.picture1,
          state.picture2,
          state.picture3,
          state.picture4,
          state.picture5,
        ],
        colors: state.colors,
        sizes: state.sizes,
        brand: state.brand,
        isSpecial: state.isSpecial,
      },
    }).then(() => {
      dispatch({ type: ACTIONS.RESET });
      setIsSuccessful(true);
      setTimeout(() => {
        setIsSuccessful(false);
      }, 2000);
    });
  };

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    const delDoc = doc(db, "categories", `${delcategory}`);

    updateDoc(delDoc, {
      [delname]: deleteField(),
    }).then(() => {
      setDelname("");
      setDelcategory("mobiles");
      setIsDeleted(true);
      setTimeout(() => {
        setIsDeleted(false);
      }, 2000);
    });
  };

  const handleGetProductToUpdate = (category, id) => {
    const docRef = doc(db, "categories", `${category}`);

    getDoc(docRef).then((snapshot) => {
      const data = snapshot.data()[id];
      dispatch({ type: ACTIONS.UPDATE_NAME, payload: data.name });
      dispatch({ type: ACTIONS.UPDATE_PRICE, payload: data.price });
      dispatch({ type: ACTIONS.UPDATE_DETAILS, payload: data.details });
      dispatch({ type: ACTIONS.UPDATE_RATE, payload: data.rate });
      dispatch({ type: ACTIONS.UPDATE_BRAND, payload: data.brand });
      dispatch({ type: ACTIONS.UPDATE_SET_SIZES, payload: data.sizes });
      dispatch({ type: ACTIONS.UPDATE_SET_COLORS, payload: data.colors });
      dispatch({ type: ACTIONS.UPDATE_IS_SPECIAL, payload: data.isSpecial });
      dispatch({ type: ACTIONS.UPDATE_PICTURE1, payload: data.image[0] });
      dispatch({ type: ACTIONS.UPDATE_PICTURE2, payload: data.image[1] });
      dispatch({ type: ACTIONS.UPDATE_PICTURE3, payload: data.image[2] });
      dispatch({ type: ACTIONS.UPDATE_PICTURE4, payload: data.image[3] });
      dispatch({ type: ACTIONS.UPDATE_PICTURE5, payload: data.image[4] });
    });
  };

  const handleUpdateSizes = (event) => {
    if (event.target.checked) {
      dispatch({ type: ACTIONS.UPDATE_ADD_SIZE, payload: event.target.value });
    } else {
      dispatch({
        type: ACTIONS.UPDATE_REMOVE_SIZE,
        payload: event.target.value,
      });
    }
  };

  const handleUpdateColors = (event) => {
    if (event.target.checked) {
      dispatch({ type: ACTIONS.UPDATE_ADD_COLOR, payload: event.target.value });
    } else {
      dispatch({
        type: ACTIONS.UPDATE_REMOVE_COLOR,
        payload: event.target.value,
      });
    }
  };

  const handleUpdateProduct = (event) => {
    event.preventDefault();
    const docRef = doc(db, "categories", `${state.updateCategory}`);
    const updatedData = {
      name: state.updateName,
      price: Number(state.updatePrice),
      details: state.updateDetails,
      rate: state.updateRate,
      sizes: state.updateSizes,
      colors: state.updateColors,
      isSpecial: state.updateIsSpecial,
      image: [
        state.updatePicture1,
        state.updatePicture2,
        state.updatePicture3,
        state.updatePicture4,
        state.updatePicture5,
      ],
      brand: state.updateBrand,
    };
    updateDoc(docRef, {
      [state.updateID]: updatedData,
    }).then(() => {
      dispatch({ type: ACTIONS.RESET });
      setIsUpdated(true);
      setTimeout(() => {
        setIsUpdated(false);
      }, 2000);
    });
  };

  const alertStyles = {
    position: "fixed",
    right: "10px",
    top: "10px",
    width: "max-content",
  };

  const cardImageStyles = {
    aspectRatio: "1 / 1",
    width: "100%",
    objectFit: "contain",
    objectPosition: "center",
  };

  const cardNameStyles = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <div className="app">
      <Alert
        variant="success"
        className="shadow"
        style={alertStyles}
        show={isSuccessful}
      >
        New product was added! 🥳🎉🎊
      </Alert>
      <Alert
        variant="success"
        className="shadow"
        style={alertStyles}
        show={isDeleted}
      >
        A product was deleted!
      </Alert>
      <Alert
        variant="success"
        className="shadow"
        style={alertStyles}
        show={isUpdated}
      >
        A product was Updated! 👍
      </Alert>
      <Container>
        <Tabs className="mt-4">
          <Tab eventKey="main" title="Main">
            <Form onSubmit={handleSubmitNew}>
              <Row>
                <Col>
                  <Form.Group className="mt-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the product name..."
                      value={state.name}
                      onChange={(event) =>
                        dispatch({
                          type: ACTIONS.SET_NAME,
                          payload: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mt-3">
                    <Form.Label>Product Price</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Enter the price name..."
                        value={state.price}
                        step="any"
                        min={0}
                        onChange={(event) =>
                          dispatch({
                            type: ACTIONS.SET_PRICE,
                            payload: event.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mt-3">
                    <Form.Label>Product Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter product details..."
                      rows={10}
                      value={state.details}
                      onChange={(event) =>
                        dispatch({
                          type: ACTIONS.SET_DETAILS,
                          payload: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mt-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={state.category}
                      onChange={(event) =>
                        dispatch({
                          type: ACTIONS.CHOOSE_CATEGORY,
                          payload: event.target.value,
                        })
                      }
                    >
                      <option value="mobiles">Mobiles</option>
                      <option value="men's">Men's Fashion</option>
                      <option value="women's">Women's Fashion</option>
                      <option value="kids'">Kids' Fashion</option>
                      <option value="beauty">Beauty</option>
                      <option value="electronics">Electronics</option>
                      <option value="home&kitchen">Home & Kitchen</option>
                      <option value="televisions">Televisions</option>
                      <option value="toys">Toys</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mt-3">
                    <Form.Label>Rate {state.rate}</Form.Label>
                    <Form.Range
                      value={state.rate}
                      min={1}
                      max={5}
                      onChange={(event) =>
                        dispatch({
                          type: ACTIONS.CHOOSE_RATE,
                          payload: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mt-3">
                    <Form.Check
                      type="checkbox"
                      label="Special Offer"
                      checked={state.isSpecial}
                      onChange={() => dispatch({ type: ACTIONS.SET_SPECIAL })}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Brand</Form.Label>
                  <Form.Select
                    value={state.brand}
                    onChange={(event) =>
                      dispatch({
                        type: ACTIONS.CHOOSE_BRAND,
                        payload: event.target.value,
                      })
                    }
                  >
                    <option value="null">None</option>
                    <option value="samsung">Samsung</option>
                    <option value="adidas">Adidas</option>
                    <option value="apple">Apple</option>
                    <option value="nike">Nike</option>
                    <option value="xiaomi">Xiaomi</option>
                    <option value="dell">Dell</option>
                    <option value="hp">HP</option>
                    <option value="realme">Realme</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mt-3">
                    <Form.Label>Colors</Form.Label>
                    <Form.Check
                      type="checkbox"
                      label="white"
                      value="white"
                      checked={state.colors.includes("white")}
                      onChange={handleSetColors}
                    />
                    <Form.Check
                      type="checkbox"
                      label="black"
                      value="black"
                      checked={state.colors.includes("black")}
                      onChange={handleSetColors}
                    />
                    <Form.Check
                      type="checkbox"
                      label="green"
                      value="green"
                      checked={state.colors.includes("green")}
                      onChange={handleSetColors}
                    />
                    <Form.Check
                      type="checkbox"
                      label="yellow"
                      value="yellow"
                      checked={state.colors.includes("yellow")}
                      onChange={handleSetColors}
                    />
                    <Form.Check
                      type="checkbox"
                      label="blue"
                      value="blue"
                      checked={state.colors.includes("blue")}
                      onChange={handleSetColors}
                    />
                    <Form.Check
                      type="checkbox"
                      label="purple"
                      value="purple"
                      checked={state.colors.includes("purple")}
                      onChange={handleSetColors}
                    />
                    <Form.Check
                      type="checkbox"
                      label="red"
                      value="red"
                      checked={state.colors.includes("red")}
                      onChange={handleSetColors}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  {(state.category === "men's" ||
                    state.category === "women's" ||
                    state.category === "kids'") && (
                    <Form.Group className="mt-3">
                      <Form.Label>Sizes</Form.Label>
                      <Form.Check
                        type="checkbox"
                        label="M"
                        value="m"
                        checked={state.sizes.includes("m")}
                        onChange={handleSetSizes}
                      />
                      <Form.Check
                        type="checkbox"
                        label="L"
                        value="l"
                        checked={state.sizes.includes("l")}
                        onChange={handleSetSizes}
                      />
                      <Form.Check
                        type="checkbox"
                        label="XL"
                        value="xl"
                        checked={state.sizes.includes("xl")}
                        onChange={handleSetSizes}
                      />
                      <Form.Check
                        type="checkbox"
                        label="XXL"
                        value="xxl"
                        checked={state.sizes.includes("xxl")}
                        onChange={handleSetSizes}
                      />
                      <Form.Check
                        type="checkbox"
                        label="XXXL"
                        value="xxxl"
                        checked={state.sizes.includes("xxxl")}
                        onChange={handleSetSizes}
                      />
                    </Form.Group>
                  )}
                </Col>
              </Row>
              <Form.Group className="mt-3">
                {(state.category === "men's" ||
                  state.category === "womem's" ||
                  state.category === "kids'") && (
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={
                      state.name &&
                      state.price &&
                      state.details &&
                      state.colors.length !== 0 &&
                      state.sizes.length !== 0 &&
                      state.picture1
                        ? false
                        : true
                    }
                  >
                    Add
                  </Button>
                )}
                {state.category !== "men's" &&
                  state.category !== "womem's" &&
                  state.category !== "kids'" && (
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={
                        state.name &&
                        state.price &&
                        state.details &&
                        state.colors.length !== 0 &&
                        state.picture1
                          ? false
                          : true
                      }
                    >
                      Add
                    </Button>
                  )}
              </Form.Group>
            </Form>
          </Tab>
          <Tab eventKey="pictures" title="Pictures">
            <Form.Group className="mt-3">
              <Form.Label>Picture 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Picture 1..."
                required
                value={state.picture1}
                onChange={(event) =>
                  dispatch({
                    type: ACTIONS.SET_PICTURE1,
                    payload: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Picture 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Picture 2..."
                required
                value={state.picture2}
                onChange={(event) =>
                  dispatch({
                    type: ACTIONS.SET_PICTURE2,
                    payload: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Picture 3</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Picture 3..."
                required
                value={state.picture3}
                onChange={(event) =>
                  dispatch({
                    type: ACTIONS.SET_PICTURE3,
                    payload: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Picture 4</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Picture 4..."
                required
                value={state.picture4}
                onChange={(event) =>
                  dispatch({
                    type: ACTIONS.SET_PICTURE4,
                    payload: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Picture 5</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Picture 5..."
                required
                value={state.picture5}
                onChange={(event) =>
                  dispatch({
                    type: ACTIONS.SET_PICTURE5,
                    payload: event.target.value,
                  })
                }
              />
            </Form.Group>
          </Tab>
          <Tab eventKey="home" title="Home" className="mt-3">
            <Tabs>
              <Tab eventKey="bestseller" title="Best Seller">
                {bestseller.length < 3 && (
                  <Row className="mt-3">
                    <Form
                      onSubmit={(event) => {
                        event.preventDefault();
                        return handleAddBookmark(
                          bestsellerCategory,
                          bestsellerID,
                          "bestseller"
                        );
                      }}
                    >
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            value={bestsellerID}
                            onChange={(event) =>
                              setBestsellerID(event.target.value)
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            value={bestsellerCategory}
                            onChange={(event) =>
                              setBestsellerCategory(event.target.value)
                            }
                          >
                            <option value="mobiles">Mobiles</option>
                            <option value="men's">Men's Fashion</option>
                            <option value="women's">Women's Fashion</option>
                            <option value="kids'">Kids' Fashion</option>
                            <option value="beauty">Beauty</option>
                            <option value="electronics">Electronics</option>
                            <option value="home&kitchen">Home & Kitchen</option>
                            <option value="televisions">Televisions</option>
                            <option value="toys">Toys</option>
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Button variant="success" type="submit">
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Row>
                )}
                <Row className="mt-3">
                  {bestseller &&
                    bestseller.map((item, index) => {
                      return (
                        <Col key={index} xs={4}>
                          <Card>
                            <Card.Body>
                              <Card.Img
                                variant="top"
                                src={item.image[0]}
                                style={cardImageStyles}
                              />
                              <Card.Title style={cardNameStyles}>
                                {item.name}
                              </Card.Title>
                              <Card.Text>{item.ID}</Card.Text>
                              <Button
                                variant="danger"
                                onClick={() =>
                                  handleDeleteBookmark(
                                    item.category,
                                    item.ID,
                                    "bestseller"
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                </Row>
              </Tab>
              <Tab eventKey="onsale" title="On Sale">
                {onsale.length < 3 && (
                  <Row className="mt-3">
                    <Form
                      onSubmit={(event) => {
                        event.preventDefault();
                        return handleAddBookmark(
                          onsaleCategory,
                          onsaleID,
                          "onsale"
                        );
                      }}
                    >
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            value={onsaleID}
                            onChange={(event) =>
                              setOnsaleID(event.target.value)
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            value={onsaleCategory}
                            onChange={(event) =>
                              setOnsaleCategory(event.target.value)
                            }
                          >
                            <option value="mobiles">Mobiles</option>
                            <option value="men's">Men's Fashion</option>
                            <option value="women's">Women's Fashion</option>
                            <option value="kids'">Kids' Fashion</option>
                            <option value="beauty">Beauty</option>
                            <option value="electronics">Electronics</option>
                            <option value="home&kitchen">Home & Kitchen</option>
                            <option value="televisions">Televisions</option>
                            <option value="toys">Toys</option>
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Button variant="success" type="submit">
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Row>
                )}
                <Row className="mt-3">
                  {onsale &&
                    onsale.map((item, index) => {
                      return (
                        <Col key={index} xs={4}>
                          <Card>
                            <Card.Img
                              variant="top"
                              src={item.image[0]}
                              style={cardImageStyles}
                            />
                            <Card.Body>
                              <Card.Title style={cardNameStyles}>
                                {item.name}
                              </Card.Title>
                              <Card.Text>{item.ID}</Card.Text>
                              <Button
                                variant="danger"
                                onClick={() =>
                                  handleDeleteBookmark(
                                    item.category,
                                    item.ID,
                                    "onsale"
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                </Row>
              </Tab>
              <Tab eventKey="featured" title="Featured">
                {featured.length < 3 && (
                  <Row className="mt-3">
                    <Form
                      onSubmit={(event) => {
                        event.preventDefault();
                        return handleAddBookmark(
                          featuredCategory,
                          featuredID,
                          "featured"
                        );
                      }}
                    >
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            value={featuredID}
                            onChange={(event) =>
                              setFeaturedID(event.target.value)
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            value={featuredCategory}
                            onChange={(event) =>
                              setFeaturedCategory(event.target.value)
                            }
                          >
                            <option value="mobiles">Mobiles</option>
                            <option value="men's">Men's Fashion</option>
                            <option value="women's">Women's Fashion</option>
                            <option value="kids'">Kids' Fashion</option>
                            <option value="beauty">Beauty</option>
                            <option value="electronics">Electronics</option>
                            <option value="home&kitchen">Home & Kitchen</option>
                            <option value="televisions">Televisions</option>
                            <option value="toys">Toys</option>
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Button variant="success" type="submit">
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Row>
                )}
                <Row className="mt-3">
                  {featured &&
                    featured.map((item, index) => {
                      return (
                        <Col key={index} xs={4}>
                          <Card>
                            <Card.Img
                              variant="top"
                              src={item.image[0]}
                              style={cardImageStyles}
                            />
                            <Card.Body>
                              <Card.Title style={cardNameStyles}>
                                {item.name}
                              </Card.Title>
                              <Card.Text>{item.ID}</Card.Text>
                              <Button
                                variant="danger"
                                onClick={() =>
                                  handleDeleteBookmark(
                                    item.category,
                                    item.ID,
                                    "featured"
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                </Row>
              </Tab>
              <Tab eventKey="trending" title="Trending">
                {trending.length < 3 && (
                  <Row className="mt-3">
                    <Form
                      onSubmit={(event) => {
                        event.preventDefault();
                        return handleAddBookmark(
                          trendingCategory,
                          trendingID,
                          "trending"
                        );
                      }}
                    >
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            value={trendingID}
                            onChange={(event) =>
                              setTrendingID(event.target.value)
                            }
                          />
                        </Col>
                        <Col>
                          <Form.Select
                            value={trendingCategory}
                            onChange={(event) =>
                              setTrendingCategory(event.target.value)
                            }
                          >
                            <option value="mobiles">Mobiles</option>
                            <option value="men's">Men's Fashion</option>
                            <option value="women's">Women's Fashion</option>
                            <option value="kids'">Kids' Fashion</option>
                            <option value="beauty">Beauty</option>
                            <option value="electronics">Electronics</option>
                            <option value="home&kitchen">Home & Kitchen</option>
                            <option value="televisions">Televisions</option>
                            <option value="toys">Toys</option>
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Button variant="success" type="submit">
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Row>
                )}
                <Row className="mt-3">
                  {trending &&
                    trending.map((item, index) => {
                      return (
                        <Col key={index} xs={4}>
                          <Card>
                            <Card.Body>
                              <Card.Img
                                variant="top"
                                src={item.image[0]}
                                style={cardImageStyles}
                              />
                              <Card.Title style={cardNameStyles}>
                                {item.name}
                              </Card.Title>
                              <Card.Text>{item.ID}</Card.Text>
                              <Button
                                variant="danger"
                                onClick={() =>
                                  handleDeleteBookmark(
                                    item.category,
                                    item.ID,
                                    "trending"
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                </Row>
              </Tab>
            </Tabs>
          </Tab>
          <Tab eventKey="delete" title="Delete">
            <Form onSubmit={handleDeleteSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mt-3">
                    <Form.Label>Delete Product By ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={delname}
                      onChange={(event) => setDelname(event.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mt-3">
                    <Form.Label>Choose the category</Form.Label>
                    <Form.Select
                      value={delcategory}
                      onChange={(event) => setDelcategory(event.target.value)}
                    >
                      <option value="mobiles">Mobiles</option>
                      <option value="men's">Men's Fashion</option>
                      <option value="women's">Women's Fashion</option>
                      <option value="kids'">Kids' Fashion</option>
                      <option value="beauty">Beauty</option>
                      <option value="electronics">Electronics</option>
                      <option value="home&kitchen">Home & Kitchen</option>
                      <option value="televisions">Televisions</option>
                      <option value="toys">Toys</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Form.Group className="mt-3">
                  <Button variant="danger" type="submit">
                    Delete
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </Tab>
          <Tab eventKey="update" title="Update">
            <Form
              className="mt-3"
              onSubmit={(event) => {
                {
                  event.preventDefault();
                  handleGetProductToUpdate(
                    state.updateCategory,
                    state.updateID
                  );
                }
              }}
            >
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={state.updateID}
                      onChange={(event) =>
                        dispatch({
                          type: ACTIONS.UPDATE_ID,
                          payload: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Product Category</Form.Label>
                    <Form.Select
                      value={state.updateCategory}
                      onChange={(event) =>
                        dispatch({
                          type: ACTIONS.UPDATE_CATEGORY,
                          payload: event.target.value,
                        })
                      }
                    >
                      <option value="mobiles">Mobiles</option>
                      <option value="men's">Men's Fashion</option>
                      <option value="women's">Women's Fashion</option>
                      <option value="kids'">Kids' Fashion</option>
                      <option value="beauty">Beauty</option>
                      <option value="electronics">Electronics</option>
                      <option value="home&kitchen">Home & Kitchen</option>
                      <option value="televisions">Televisions</option>
                      <option value="toys">Toys</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="mt-3">
                  <Button type="submit">Get Product</Button>
                </Col>
              </Row>
            </Form>
            <Tabs className="mt-3">
              <Tab eventKey="main" title="Main">
                <Form onSubmit={handleUpdateProduct}>
                  <Row className="mt-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={state.updateName}
                          onChange={(event) =>
                            dispatch({
                              type: ACTIONS.UPDATE_NAME,
                              payload: event.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Product Price</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>$</InputGroup.Text>
                          <Form.Control
                            type="number"
                            step="any"
                            min={0}
                            value={state.updatePrice}
                            onChange={(event) =>
                              dispatch({
                                type: ACTIONS.UPDATE_PRICE,
                                payload: event.target.value,
                              })
                            }
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Product Details</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={state.updateDetails}
                          onChange={(event) =>
                            dispatch({
                              type: ACTIONS.UPDATE_DETAILS,
                              payload: event.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Form.Group className="mt-3">
                        <Form.Label>Rate {state.updateRate}</Form.Label>
                        <Form.Range
                          value={state.updateRate}
                          min={1}
                          max={5}
                          onChange={(event) =>
                            dispatch({
                              type: ACTIONS.UPDATE_RATE,
                              payload: event.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Brand</Form.Label>
                        <Form.Select
                          value={state.updateBrand}
                          onChange={(event) =>
                            dispatch({
                              type: ACTIONS.UPDATE_BRAND,
                              payload: event.target.value,
                            })
                          }
                        >
                          <option value="null">None</option>
                          <option value="samsung">Samsung</option>
                          <option value="adidas">Adidas</option>
                          <option value="apple">Apple</option>
                          <option value="nike">Nike</option>
                          <option value="xiaomi">Xiaomi</option>
                          <option value="dell">Dell</option>
                          <option value="hp">HP</option>
                          <option value="realme">Realme</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Form.Group>
                        <Form.Check
                          type="checkbox"
                          label="Special Offer"
                          checked={state.updateIsSpecial}
                          onChange={() =>
                            dispatch({ type: ACTIONS.UPDATE_SPECIAL })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Color</Form.Label>
                        <Form.Check
                          type="checkbox"
                          label="white"
                          value="white"
                          checked={state.updateColors.includes("white")}
                          onChange={handleUpdateColors}
                        />
                        <Form.Check
                          type="checkbox"
                          label="black"
                          value="black"
                          checked={state.updateColors.includes("black")}
                          onChange={handleUpdateColors}
                        />
                        <Form.Check
                          type="checkbox"
                          label="green"
                          value="green"
                          checked={state.updateColors.includes("green")}
                          onChange={handleUpdateColors}
                        />
                        <Form.Check
                          type="checkbox"
                          label="yellow"
                          value="yellow"
                          checked={state.updateColors.includes("yellow")}
                          onChange={handleUpdateColors}
                        />
                        <Form.Check
                          type="checkbox"
                          label="blue"
                          value="blue"
                          checked={state.updateColors.includes("blue")}
                          onChange={handleUpdateColors}
                        />
                        <Form.Check
                          type="checkbox"
                          label="purple"
                          value="purple"
                          checked={state.updateColors.includes("purple")}
                          onChange={handleUpdateColors}
                        />
                        <Form.Check
                          type="checkbox"
                          label="red"
                          value="red"
                          checked={state.updateColors.includes("red")}
                          onChange={handleUpdateColors}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Sizes</Form.Label>
                        <Form.Check
                          type="checkbox"
                          label="M"
                          value="m"
                          checked={state.updateSizes.includes("m")}
                          onChange={handleUpdateSizes}
                        />
                        <Form.Check
                          type="checkbox"
                          label="L"
                          value="l"
                          checked={state.updateSizes.includes("l")}
                          onChange={handleUpdateSizes}
                        />
                        <Form.Check
                          type="checkbox"
                          label="XL"
                          value="xl"
                          checked={state.updateSizes.includes("xl")}
                          onChange={handleUpdateSizes}
                        />
                        <Form.Check
                          type="checkbox"
                          label="XXL"
                          value="xxl"
                          checked={state.updateSizes.includes("xxl")}
                          onChange={handleUpdateSizes}
                        />
                        <Form.Check
                          type="checkbox"
                          label="XXXL"
                          value="xxxl"
                          checked={state.updateSizes.includes("xxxl")}
                          onChange={handleUpdateSizes}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Button type="submit">Update</Button>
                    </Col>
                  </Row>
                </Form>
              </Tab>
              <Tab eventKey="pictures" title="Pictures">
                <Row className="mt-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Prodcut Picture 1</Form.Label>
                      <Form.Control
                        type="text"
                        value={state.updatePicture1}
                        onChange={(event) =>
                          dispatch({
                            type: ACTIONS.UPDATE_PICTURE1,
                            payload: event.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Prodcut Picture 2</Form.Label>
                      <Form.Control
                        type="text"
                        value={state.updatePicture2}
                        onChange={(event) =>
                          dispatch({
                            type: ACTIONS.UPDATE_PICTURE2,
                            payload: event.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Prodcut Picture 3</Form.Label>
                      <Form.Control
                        type="text"
                        value={state.updatePicture3}
                        onChange={(event) =>
                          dispatch({
                            type: ACTIONS.UPDATE_PICTURE3,
                            payload: event.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Prodcut Picture 4</Form.Label>
                      <Form.Control
                        type="text"
                        value={state.updatePicture4}
                        onChange={(event) =>
                          dispatch({
                            type: ACTIONS.UPDATE_PICTURE4,
                            payload: event.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Prodcut Picture 5</Form.Label>
                      <Form.Control
                        type="text"
                        value={state.updatePicture5}
                        onChange={(event) =>
                          dispatch({
                            type: ACTIONS.UPDATE_PICTURE5,
                            payload: event.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Dashboard;
