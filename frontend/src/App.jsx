
import { useEffect, useState } from "react";
import { deviceApi } from "./api/deviceApi";
import "./App.css";

const STATUSES = [
  "Đang sử dụng",
  "Hư hỏng",
  "Đang sửa chữa",
  "Ngừng sử dụng"
];

const emptyForm = {
  deviceId: "",
  name: "",
  deviceType: "",
  room: "",
  brand: "",
  model: "",
  quantity: 1,
  status: "Đang sử dụng",
  purchaseDate: "",
  description: ""
};

function App() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  async function loadDevices(keyword = "") {
    setLoading(true);

    try {
      const result = await deviceApi.getAll(keyword);
      setDevices(result.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function initialLoad() {
      try {
        const result = await deviceApi.getAll();
        if (!cancelled) setDevices(result.data);
      } catch (error) {
        if (!cancelled) {
          setMessage({
            type: "error",
            text: error.message
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    initialLoad();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = {
    total: devices.length,
    using: devices.filter(
      d => d.status === "Đang sử dụng"
    ).length,
    broken: devices.filter(
      d => d.status === "Hư hỏng"
    ).length,
    repairing: devices.filter(
      d => d.status === "Đang sửa chữa"
    ).length
  };

  function openAdd() {
    setForm({ ...emptyForm });
    setSelected(null);
    setModal("add");
  }

  function openEdit(device) {
    setSelected(device);
    setForm({
      deviceId: device.deviceId,
      name: device.name,
      deviceType: device.deviceType,
      room: device.room,
      brand: device.brand,
      model: device.model,
      quantity: device.quantity,
      status: device.status,
      purchaseDate: device.purchaseDate?.slice(0, 10) || "",
      description: device.description || ""
    });
    setModal("edit");
  }

  async function openDetail(device) {
    try {
      const result = await deviceApi.getById(device._id);
      setSelected(result.data);
      setModal("detail");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message
      });
    }
  }

  function changeForm(event) {
    const { name, value } = event.target;

    setForm(prev => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!Number.isInteger(form.quantity) ||
        form.quantity < 0) {
      setMessage({
        type: "error",
        text: "Số lượng phải là số nguyên không âm"
      });
      return;
    }

    setSaving(true);

    try {
      let result;

      if (modal === "edit") {
        result = await deviceApi.update(selected._id, form);
      } else {
        result = await deviceApi.create(form);
      }

      setModal(null);
      setMessage({
        type: "success",
        text: result.message
      });

      await loadDevices(search);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(device) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa thiết bị ${device.deviceId}?`
    );

    if (!confirmed) return;

    try {
      const result = await deviceApi.remove(device._id);

      setMessage({
        type: "success",
        text: result.message
      });

      await loadDevices(search);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message
      });
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    await loadDevices(search);
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="brand-icon">D</div>
          <div>
            <h1>Device Manager</h1>
            <p>Hệ thống quản lý thiết bị phòng học</p>
          </div>
        </div>

        <div className="student">
          <strong>Nguyễn Trần Đoan Trang</strong>
          <span>MSSV: 237384</span>
        </div>
      </header>

      <main className="container">
        <section className="heading">
          <div>
            <h2>Quản lý thiết bị</h2>
            <p>
              Theo dõi và quản lý thiết bị phòng học
              trên nền tảng đám mây.
            </p>
          </div>

          <button className="btn primary" onClick={openAdd}>
            + Thêm thiết bị
          </button>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Tổng thiết bị</span>
            <strong>{stats.total}</strong>
          </div>

          <div className="stat-card">
            <span>Đang sử dụng</span>
            <strong>{stats.using}</strong>
          </div>

          <div className="stat-card">
            <span>Hư hỏng</span>
            <strong>{stats.broken}</strong>
          </div>

          <div className="stat-card">
            <span>Đang sửa chữa</span>
            <strong>{stats.repairing}</strong>
          </div>
        </section>

        {message && (
          <div
            role="alert"
            className={`alert ${message.type}`}
          >
            <span>{message.text}</span>
            <button
              aria-label="Đóng thông báo"
              onClick={() => setMessage(null)}
            >
              ×
            </button>
          </div>
        )}

        <section className="panel">
          <div className="panel-header">
            <h3>Danh sách thiết bị</h3>

            <form className="search" onSubmit={handleSearch}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm mã, tên, loại, phòng..."
              />
              <button className="btn primary" type="submit">
                Tìm kiếm
              </button>
              <button
                className="btn secondary"
                type="button"
                onClick={() => {
                  setSearch("");
                  loadDevices("");
                }}
              >
                Đặt lại
              </button>
            </form>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Mã thiết bị</th>
                  <th>Tên thiết bị</th>
                  <th>Loại</th>
                  <th>Phòng học</th>
                  <th>Số lượng</th>
                  <th>Tình trạng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="empty">
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : devices.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty">
                      Không tìm thấy thiết bị
                    </td>
                  </tr>
                ) : (
                  devices.map(device => (
                    <tr key={device._id}>
                      <td>
                        <strong>{device.deviceId}</strong>
                      </td>
                      <td>{device.name}</td>
                      <td>{device.deviceType}</td>
                      <td>{device.room}</td>
                      <td>{device.quantity}</td>
                      <td>
                        <span className={`status status-${
                          STATUSES.indexOf(device.status)
                        }`}>
                          {device.status}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <button
                            className="btn small"
                            onClick={() => openDetail(device)}
                          >
                            Chi tiết
                          </button>
                          <button
                            className="btn small"
                            onClick={() => openEdit(device)}
                          >
                            Sửa
                          </button>
                          <button
                            className="btn small danger"
                            onClick={() => handleDelete(device)}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {modal && (
        <div
          className="modal-overlay"
          onClick={() => !saving && setModal(null)}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Thông tin thiết bị"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>
                {modal === "add"
                  ? "Thêm thiết bị"
                  : modal === "edit"
                    ? "Cập nhật thiết bị"
                    : "Chi tiết thiết bị"}
              </h3>

              <button
                disabled={saving}
                onClick={() => setModal(null)}
              >
                ×
              </button>
            </div>

            {modal === "detail" ? (
              <div className="detail">
                {[
                  ["Mã thiết bị", selected.deviceId],
                  ["Tên thiết bị", selected.name],
                  ["Loại thiết bị", selected.deviceType],
                  ["Phòng học", selected.room],
                  ["Hãng sản xuất", selected.brand],
                  ["Model", selected.model],
                  ["Số lượng", selected.quantity],
                  ["Tình trạng", selected.status],
                  ["Ngày mua", selected.purchaseDate?.slice(0, 10)],
                  ["Mô tả", selected.description]
                ].map(([label, value]) => (
                  <div className="detail-row" key={label}>
                    <strong>{label}</strong>
                    <span>{value ?? ""}</span>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  {[
                    ["deviceId", "Mã thiết bị"],
                    ["name", "Tên thiết bị"],
                    ["deviceType", "Loại thiết bị"],
                    ["room", "Phòng học"],
                    ["brand", "Hãng sản xuất"],
                    ["model", "Model"]
                  ].map(([name, label]) => (
                    <label key={name}>
                      {label}
                      <input
                        name={name}
                        value={form[name]}
                        onChange={changeForm}
                        required
                        maxLength={100}
                      />
                    </label>
                  ))}

                  <label>
                    Số lượng
                    <input
                      type="number"
                      name="quantity"
                      value={form.quantity}
                      onChange={changeForm}
                      min="0"
                      step="1"
                      required
                    />
                  </label>

                  <label>
                    Tình trạng
                    <select
                      name="status"
                      value={form.status}
                      onChange={changeForm}
                    >
                      {STATUSES.map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Ngày mua
                    <input
                      type="date"
                      name="purchaseDate"
                      value={form.purchaseDate}
                      onChange={changeForm}
                      required
                    />
                  </label>

                  <label className="full">
                    Mô tả
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={changeForm}
                      rows="3"
                    />
                  </label>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn secondary"
                    disabled={saving}
                    onClick={() => setModal(null)}
                  >
                    Hủy
                  </button>

                  <button
                    type="submit"
                    className="btn primary"
                    disabled={saving}
                  >
                    {saving
                      ? "Đang lưu..."
                      : modal === "add"
                        ? "Thêm thiết bị"
                        : "Lưu thay đổi"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <footer className="footer">
        Điện toán đám mây • MSSV 237384
      </footer>
    </div>
  );
}

export default App;
