import supabase from "./supabase";
import toast from "react-hot-toast";

//---------------------------------------
//Read data from Supabase Cabins
//---------------------------------------
export async function getCabins() {

//-----Code from Supabase doc-----
let { data, error } = await supabase
  .from('cabins')
  .select('*') 
  .order("created_at", { ascending: true });
//--------------------------------------

if (error) {
	console.error(error);
	throw new Error("Cabins could not be loaded");
}
	return data;
}


//---------------------------------------
//Delete row in Supabase Cabins?
//---------------------------------------
export async function deleteCabin(cabin) {

	//-----Code from Supabase doc-----
	const { data, error } = await supabase
	.from('cabins')
	.delete()
	.eq('id', cabin.id)
	//--------------------------------------
	
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}

	//delete image from supabase storage
	const { error: deleteError } = await supabase.storage
    .from("cabin-images")
    .remove([cabin.image.split("/").pop()]); 
	//= url adress split by /, last part (name of img) is used for identifying img in storage

	if (deleteError) {
		toast.error("We couldnt delete the image from the database");
	}
	
	return data;
}


//---------------------------------------
//Add row to Supabase Cabins:
//---------------------------------------
export async function addCabin(newCabin) {

	const usingOldImg = newCabin.image?.startsWith?.("https://tmmduhcwahllfauqhkuj.supabase.co"); 
	const imageUniqueName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
	const imageCompletePath = usingOldImg ? newCabin.image : `https://tmmduhcwahllfauqhkuj.supabase.co/storage/v1/object/public/cabin-images/${imageUniqueName}` 
	
	const { data, error } = await supabase
	.from('cabins')
	.insert([{...newCabin, image: imageCompletePath}])
	.select() 

		
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be added");
	}

	//---Code from Supabase doc (upload image)--
	if(!usingOldImg){
		const { error: imgError } = await supabase
		.storage
		.from('cabin-images')
		.upload(imageUniqueName, newCabin.image)
	//-----------

		if(imgError) {
			await supabase
			.from('cabins')
			.delete()
			.eq('id', data.id);
			throw new Error("Obrázek nemohl být nahrán, pokoj nebyl přidán.");
		}
	}
	return data;
}


//---------------------------------------
//EDIT row in Supabase Cabins:
//---------------------------------------
export async function editCabin(newCabin, oldImgUrl) {
	const usingOldImg = newCabin.image?.startsWith?.("https://tmmduhcwahllfauqhkuj.supabase.co"); 
	//true if url adress of img = supabase url

	const imageUniqueName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
	const imageCompletePath = usingOldImg ? newCabin.image : `https://tmmduhcwahllfauqhkuj.supabase.co/storage/v1/object/public/cabin-images/${imageUniqueName}` 


	const { data, error } = await supabase
	.from('cabins')
	.update({ ...newCabin, image: imageCompletePath })
	.eq('id', newCabin.id)
	.select()

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be editted");
	}

	if(!usingOldImg){
		//---code from supabase doc (upload file):
		const { error: imgError } = await supabase.storage
		.from('cabin-images')
		.upload(imageUniqueName, newCabin.image)

	if(imgError) {
		await supabase
		.from('cabins')
		.delete()
		.eq('id', data.id);
		throw new Error("Obrázek nemohl být nahrán, pokoj nebyl upraven.");
	}
   

	//user upload new img -> delete old img from supabase storage
	const { error: changeImgError } = await supabase.storage
	.from("cabin-images")
	.remove([oldImgUrl.split("/").pop()]); 

	if (changeImgError) {
		toast.error("We couldnt delete the image from the database");
	}
	}


	return data;
}