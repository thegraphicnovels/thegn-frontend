import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useInput } from 'rooks';
import {
  userDetailQuery,
  userCreateQuery,
  userModifyQuery,
  userDeleteQuery,
} from '../../../apollo/userQuery';
import ManageUserEditPresenter from './ManageUserEditPresenter';

const ManageUserEditContainer = ({
  history,
  match: {
    params: { userId },
  },
}) => {
  const { data: userData } = useQuery(userDetailQuery, {
    variables: { id: userId },
    fetchPolicy: 'network-only',
    skip: !userId,
  });

  const idInput = useInput(userData?.detailUser?.id);
  const nameInput = useInput(userData?.detailUser?.name);
  const oPasswordInput = useInput('');
  const cPasswordInput = useInput('');
  const cPasswordInputR = useInput('');

  const [loading, setLoading] = useState(false);
  const [userCreateMutation] = useMutation(userCreateQuery);
  const [userModifyMutation] = useMutation(userModifyQuery);
  const [userDeleteMutation] = useMutation(userDeleteQuery);

  const handleCreate = async (action) => {
    try {
      if (action === 'create') {
        setLoading(true);
        const {
          data: { createUser },
        } = await userCreateMutation({
          variables: {
            id: idInput.value,
            name: nameInput.value,
            password: oPasswordInput.value,
          },
        });

        if (createUser) {
          window.alert('This User Create success');
          setLoading(false);
        }
      } else if (action === 'edit') {
        if (cPasswordInput.value !== cPasswordInputR.value) {
          window.alert('Change Password & Re Change Password does not match');
        } else {
          setLoading(true);
          const {
            data: { modifyUser },
          } = await userModifyMutation({
            variables: {
              id: userId,
              name: nameInput.value,
              oPassword: oPasswordInput.value,
              cPassword: cPasswordInput.value,
            },
          });

          if (modifyUser) {
            window.alert('This User Edit success');
            setLoading(false);
          }
          history.push('/manage/user');
        }
      }
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm('Do you wnat to delete User?')) {
        if (idInput.value === 'admin') {
          window.alert('Admin User Delete not Available!!!');
        } else {
          setLoading(true);
          const {
            data: { deleteUser },
          } = await userDeleteMutation({
            variables: {
              id: userId,
            },
          });

          if (deleteUser) {
            window.alert('This User Delete success');
            history.push('/manage/user');
          } else {
            window.alert('Failed to delete User');
            setLoading(false);
          }
        }
      }
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setLoading(false); // cleanup function을 이용
  }, []);

  //   뒤로가기 클릭시
  useEffect(() => {
    window.onpopstate = (e) => {
      history.push('/manage/user');
    };
  }, [history]);

  return (
    <ManageUserEditPresenter
      loading={loading}
      userData={userData}
      idInput={idInput}
      nameInput={nameInput}
      oPasswordInput={oPasswordInput}
      cPasswordInput={cPasswordInput}
      cPasswordInputR={cPasswordInputR}
      handleCreate={handleCreate}
      handleDelete={handleDelete}
    />
  );
};

ManageUserEditContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default ManageUserEditContainer;
