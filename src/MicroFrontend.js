import React from 'react';

class MicroFrontend extends React.Component {
  componentDidMount() {
    const { name, host, document } = this.props;
    const scriptId = `micro-frontend-script-${name}`;
    console.log(name, host, document, "heree");

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend();
      return;
    }

    fetch(`fcu/asset-manifest.json`,{
      method: "GET",
    })
      .then(res => res.json())
      .then(manifest => {
        console.log(manifest, 'manifest');
        const script = document.createElement('script');

        script.id = scriptId;
        script.crossOrigin = '';
        script.src = `fcu${manifest['files']['main.js']}`;
        script.onload = this.renderMicroFrontend;
        document.head.appendChild(script);
      })
      
  }

  componentWillUnmount() {
    const { name, window } = this.props;

    window[`unmount${name}`]?.(`${name}-container`);
  }

  renderMicroFrontend = () => {
    const { name, window, history } = this.props;

    window[`render${name}`]?.(`${name}-container`, history);
  };

  render() {
    return <main id={`${this.props.name}-container`} />;
  }
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;


// import React, { useEffect } from 'react';

// const MicroFrontend = ({ name, host, document, history, window }) => {
//   useEffect(() => {
//     const scriptId = `micro-frontend-script-${name}`;

//     console.log(name, host);

//     if (document.getElementById(scriptId)) {
//       renderMicroFrontend();
//       return;
//     }

//     fetch(`${host}/asset-manifest.json`)
//       .then(res => res.json())
//       .then(manifest => {
//         const script = document.createElement('script');
//         script.id = scriptId;
//         script.crossOrigin = '';
//         script.src = `${host}${manifest['main.js']}`;
//         script.onload = renderMicroFrontend;
//         document.head.appendChild(script);
//       });

//     return () => {
//       window[`unmount${name}`](`${name}-container`);
//     };
//   }, [name, host, document, window]);

//   const renderMicroFrontend = () => {
//     window[`render${name}`](`${name}-container`, history);
//   };

//   return <main id={`${name}-container`} />;
// };

// MicroFrontend.defaultProps = {
//   document: window.document,
//   window: window,
// };

// export default MicroFrontend;
