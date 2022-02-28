import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { ViewProfile } from "../components/view-profile/view-profile.component";
import { ViewOrders } from "../components/view-orders/view-orders.component";
import { UpdateProfileComponent } from "../components/update-profile/update-profile.component";
import { UpdatePasswordComponent } from "../components/update-password/update-password.component";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyInfo = ({ currentUser, view }) => {
  const router = useRouter();
  const [value, setValue] = useState(view);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
        aria-label="My Info"
      >
        <Tab value="profile" label="My Profile" {...a11yProps("profile")} />
        <Tab value="orders" label="My Orders" {...a11yProps("orders")} />
        <Tab
          value="update_profile"
          label="Update Profile"
          {...a11yProps("update_profile")}
        />
        <Tab
          value="update_password"
          label="Update Password"
          {...a11yProps("update_password")}
        />
      </Tabs>
      <TabPanel value={value} index={"profile"}>
        <ViewProfile />
      </TabPanel>
      <TabPanel value={value} index={"orders"}>
        <ViewOrders />
      </TabPanel>
      <TabPanel value={value} index={"update_profile"}>
        <UpdateProfileComponent />
      </TabPanel>
      <TabPanel value={value} index={"update_password"}>
        <UpdatePasswordComponent />
      </TabPanel>
    </>
  );
};

MyInfo.getInitialProps = async (context, client, currentUser) => {
  const view = context.query["view"] || "profile";
  return { currentUser, view };
};

export default MyInfo;
