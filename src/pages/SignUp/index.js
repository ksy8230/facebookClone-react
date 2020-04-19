import React, { useState } from 'react';
import EmailPasswordForm from '@/pages/SignUp/EmailPasswordForm';
import ProfileForm from '@/pages/SignUp/ProfileForm';
import { STEPS } from '@/pages/SignUp/helpers';
import { Formik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  email: '',
  password: '',
  password2: '',
  name: '',
  file: '',
};

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address!')
    .max(255, 'Must be shorter than 255')
    .required('Email is required'),

  password: Yup.string().min(5, 'Must be longer than 5').required('Password is required'),
  password2: Yup.string()
    .min(5, 'Must be longer than 5')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password is required'),
  name: Yup.string().min(1, 'Must have character').required('Name is required'),
});

const renderForm = (step, setStep, values, errors, touched, handleChange, handleBlur, handleSubmit) => {
  switch (step) {
    case STEPS.EMAIL_PASSWORD:
      return (
        <EmailPasswordForm
          setStep={setStep}
          errors={errors}
          touched={touched}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      );
    case STEPS.PROFILE:
      return (
        <ProfileForm
          setStep={setStep}
          errors={errors}
          touched={touched}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      );
  }
};

function SignUp() {
  const [step, setStep] = useState(STEPS.EMAIL_PASSWORD);

  return (
    <div className="signup container">
      <h1 className="text-center">계정 만들기</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(JSON.stringify(values, null, 2));
        }}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) =>
          renderForm(step, setStep, values, errors, touched, handleChange, handleBlur, handleSubmit)
        }
      </Formik>

      <style jsx global>{`
        .signup form {
          max-width: 320px;
          padding: 8px;
          margin: 0 auto;
        }
        .signup input.form-control {
          font-size: 16px;
          height: auto;
          padding: 10px;
          margin-bottom: 1rem;
        }
        .signup button.btn {
          background-color: #3b5999;
          color: #fffffe;
          font-weight: 800;
          border-color: unset;
          margin-top: 10px;
        }
        .signup button.btn-secondary {
          background-color: #566888;
        }
        .signup .text-help {
          margin-top: 10px;
        }
        .signup .login-here {
          font-weight: 900;
          color: #3a5999;
        }
      `}</style>
    </div>
  );
}

export default SignUp;
