"use server"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

// get admin overview all data (summary data)

export const getAllSummary = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/dashboard`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard summary");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};


// get all user for admin

export const getAllUser = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/users`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};


// get all task for admin
export const getAllTasks = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/tasks`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch tasks");
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

// delete task by admin
export const deleteTaskByAdmin = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/tasks/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};



// get all payment data
export const getAllPaymentdata = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/admin/payments`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch payments");
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};