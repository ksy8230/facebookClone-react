import React from 'react';
import { Link } from 'react-router-dom';
import { STEPS } from '@/pages/SignUp/helpers';
import Error from '@/components/Error/Signup';

const ProfileForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(props.values, null, 2));
  };

  const handleClickGoBack = () => props.setStep(STEPS.EMAIL_PASSWORD);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          placeholder="이름"
          required
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.name}
        />
        <Error touched={props.touched.name} message={props.errors.name} />

        <input
          type="file"
          name="file"
          id="file"
          className="form-control"
          placeholder="Profile"
          onChange={props.handleChange}
          value={props.values.file}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!props.values.name}>
          가입하기
        </button>
        <button className="btn btn-lg btn-secondary btn-block" type="button" onClick={handleClickGoBack}>
          이전 단계
        </button>
      </form>
      <p className="text-help text-center">
        이미 계정이 있으신가요?{' '}
        <Link className="text-center login-here" to="/login">
          로그인 하기
        </Link>
      </p>
    </>
  );
};

export default ProfileForm;
