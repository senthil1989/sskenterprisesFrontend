import React from "react";
import Menu from "./Menu";
import "../styles.scss";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children,
    toggleModal
}) => (
    <div>
        <Menu />
        <div className={`${className} top-m1`}>{children}</div>
    </div>
);

export default Layout;