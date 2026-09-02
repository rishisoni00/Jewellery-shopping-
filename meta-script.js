const handleBooking = async () => {
  const customer_name = localStorage.getItem("customer_name");
  const phone = localStorage.getItem("phone");

  if(!customer_name || !phone){
    alert("Pehle Sign In karo!");
    return;
  }

  const { error } = await supabase.from('bookings').insert([
    { customer_name, phone, product_name: productName }
  ]);

  if(!error) alert("Booking Ho Gayi!");
    }
