import React from "react";

const Steps = () => {
  return (
    <container>
      <div>
        <h3 className="stepsh3">How does it work? </h3>
        <div className="steps">
          <div className="small-steps">
            <h3>Creat an Account:</h3>
            <p className="parag">
              Create your Blue account. It's free and it will always be!
            </p>
          </div>
          <div className="small-steps">
            <h3>Create your Projects:</h3>
            <p className="parag">
              Create your project and don't forget to add the project members.
              They will have acces tot hem wherever they are located.
            </p>
          </div>
          <div className="small-steps">
            <h3>Organize your Pipeline:</h3>
            <p className="parag">
              Add the tasks related to your project. You can change the task
              status according to the project progress. Simple and easy to
              coordinate your teams remotly
            </p>
          </div>
        </div>
      </div>
    </container>
  );
};

export default Steps;
