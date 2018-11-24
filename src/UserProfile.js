import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const USER_PROFILE = gql`
  query userProfile($id: String){
    user(id: $id){
      first_name
      last_name
      email
    }
  }
`;

export default function UserProfile({ id }) {
  return (
    <div className="user-profile">
      <Query query={USER_PROFILE} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const { first_name, last_name, email } = data.user;
          return (
            <Fragment>
              <div className="name">
                Name: {first_name} {last_name}
              </div>
              <div className="email">Email: {email}</div>
            </Fragment>
          );
        }}
      </Query>
    </div>
  );
}
