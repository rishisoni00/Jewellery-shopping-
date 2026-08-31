const handleBooking = async () => {
  const customer_name = localStorage.getItem("customer_name");
  const phone = localStorage.getItem("phone");

  // Ab number maangne ki zarurat nahi, seedha Sign In wala number jayega
  const { error } = await supabase.from('bookings').insert([
    { 
      customer_name: customer_name, 
      phone: phone, 
      product_name: productName 
    }
  ]);
      }
