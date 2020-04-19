import React from 'react';
import { STEPS } from '@/pages/SignUp/helpers';
import Error from '@/components/Error/Signup';

const EmailPasswordForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(props.values, null, 2));
    props.setStep(STEPS.PROFILE);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        className="form-control"
        placeholder="이메일"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.email}
      />
      <Error touched={props.touched.email} message={props.errors.email} />
      <input
        type="password"
        name="password"
        id="password"
        className="form-control"
        placeholder="비밀번호"
        onChange={props.handleChange}
        value={props.values.password}
        onBlur={props.handleBlur}
      />
      <Error touched={props.touched.password} message={props.errors.password} />
      <input
        type="password"
        name="password2"
        id="password2"
        className="form-control"
        placeholder="비밀번호 확인"
        onChange={props.handleChange}
        value={props.values.password2}
        onBlur={props.handleBlur}
      />
      <Error touched={props.touched.password2} message={props.errors.password2} />
      <button
        className="btn btn-lg btn-primary btn-block"
        type="submit"
        disabled={!(props.values.email && props.values.password && props.values.password2)}>
        다음
      </button>
    </form>
  );
};

export default EmailPasswordForm;
