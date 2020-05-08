import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../../components/loader';
import naviList from '../../../components/naviList';
import { formatDate } from '../../../common';

const ManageUserEditPresenter = ({
  userData,
  loading,
  idInput,
  nameInput,
  oPasswordInput,
  cPasswordInput,
  cPasswordInputR,
  handleCreate,
  handleDelete,
}) => {
  return loading ? (
    <Loader />
  ) : (
    <div className="contents">
      <naviList />

      <div className="registBox">
        <h2>User</h2>

        <table>
          <caption>유저</caption>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '75%' }} />
          </colgroup>
          <tbody>
            <tr>
              <th>ID</th>
              <td>
                {userData ? (
                  idInput.value
                ) : (
                  <input
                    type="text"
                    className="inpTxt"
                    id="id"
                    title="id"
                    placeholder="ID"
                    value={idInput.value}
                    onChange={idInput.onChange}
                  />
                )}
              </td>
            </tr>
            <tr>
              <th>NAME</th>
              <td>
                <input
                  type="text"
                  className="inpTxt"
                  id="userName"
                  title="name"
                  placeholder="NAME"
                  value={nameInput.value}
                  onChange={nameInput.onChange}
                />
              </td>
            </tr>
            {userData ? (
              <>
                <tr>
                  <th rowSpan="3">PASSWORD CHANGE</th>
                  <td>
                    <input
                      type="password"
                      className="inpTxt"
                      id="oPasswordInput"
                      title="oPasswordInput"
                      placeholder="Original PASSWORD"
                      value={oPasswordInput.value}
                      onChange={oPasswordInput.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="password"
                      className="inpTxt"
                      id="cPasswordInput"
                      title="cPasswordInput"
                      placeholder="Change PASSWORD"
                      value={cPasswordInput.value}
                      onChange={cPasswordInput.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="password"
                      className="inpTxt"
                      id="c_password_r"
                      title="c_password_r"
                      placeholder="Re Change PASSWORD"
                      value={cPasswordInputR.value}
                      onChange={cPasswordInputR.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>CREATE DATE</th>
                  <td>{formatDate(userData?.detailUser?.createAt)}</td>
                </tr>
              </>
            ) : (
              <tr>
                <th>PASSWORD</th>
                <td>
                  <input
                    type="password"
                    className="inpTxt"
                    id="oPasswordInput"
                    title="oPasswordInput"
                    placeholder="PASSWORD"
                    value={oPasswordInput.value}
                    onChange={oPasswordInput.onChange}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="btnPageBox">
        {!userData ? (
          <button
            className="btnCustm"
            type="button"
            onClick={() => handleCreate('create')}
          >
            <span>Create</span>
          </button>
        ) : (
          <button
            className="btnCustm"
            type="button"
            onClick={() => handleCreate('edit')}
          >
            <span>Edit</span>
          </button>
        )}
        {userData && (
          <button
            className="btnCustm"
            type="button"
            onClick={() => handleDelete(userData._id)}
            style={{ color: 'red' }}
          >
            <span>Delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

ManageUserEditPresenter.defaultProps = {
  nameInput: '',
  idInput: '',
  oPasswordInput: '',
  cPasswordInput: '',
  cPasswordInputR: '',
  userData: null,
};

ManageUserEditPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  userData: PropTypes.object,
  nameInput: PropTypes.object,
  idInput: PropTypes.object,
  oPasswordInput: PropTypes.object,
  cPasswordInput: PropTypes.object,
  cPasswordInputR: PropTypes.object,
  handleCreate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ManageUserEditPresenter;
