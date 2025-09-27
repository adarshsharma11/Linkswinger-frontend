<template>
    <div class="theme-landing">
        <section class="edit-profile-page bg-dark text-white min-vh-100 py-4">
            <div class="container">
                <!-- Header -->
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="text-white">Edit Profile</h2>
                    <button class="btn btn-secondary btn-sm">Back to Profile</button>
                </div>
                <!-- Photos & Videos -->
                <div class="card bg-black text-white mb-4 edit-card">
                    <div class="card-body">
                        <h5 class="mb-3">Photos & Videos</h5>
                        <div class="row g-3">
                            <!-- Photo Upload -->
                            <div class="col-12 col-md-6">
                                <label class="form-label">Profile Photo</label>
                                <input type="file" accept="image/*"
                                    class="form-control bg-dark text-white border-secondary" />
                                <div class="mt-3 text-center">
                                    <img src="/images/avtar/1.jpg" alt="Preview" class="img-fluid rounded shadow"
                                        style="max-height: 200px; object-fit: cover" />
                                </div>
                            </div>

                            <!-- Video Upload -->
                            <!-- <div class="col-12 col-md-6">
                                <label class="form-label">Profile Video</label>
                                <input type="file" accept="video/*"
                                    class="form-control bg-dark text-white border-secondary" />
                                <div class="mt-3 text-center">
                                    <video src="/videos/sample.mp4" controls class="w-100 rounded shadow"
                                        style="max-height: 200px; object-fit: cover"></video>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>

                <!-- Edit Form -->
                <form>
                    <div class="row gy-4">
                        <!-- Left Column -->
                        <div class="col-12 col-md-6">
                            <div class="card bg-black text-white">
                                <div class="card-body">
                                    <h5 class="mb-3">Personal Information</h5>
                                    <div class="mb-3">
                                        <label class="form-label">Nickname</label>
                                        <input value="JohnDoe" type="text"
                                            class="form-control bg-dark text-white border-secondary" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Gender</label>
                                        <select class="form-select bg-dark text-white border-secondary">
                                            <option selected>Male</option>
                                            <option>Female</option>
                                            <option>Couple</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Orientation</label>
                                        <input value="Straight" type="text"
                                            class="form-control bg-dark text-white border-secondary" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Town</label>
                                        <input value="London" type="text"
                                            class="form-control bg-dark text-white border-secondary" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column -->
                        <div class="col-12 col-md-6">
                            <div class="card bg-black text-white">
                                <div class="card-body">
                                    <h5 class="mb-3">Account Details</h5>
                                    <div class="mb-3">
                                        <label class="form-label">Email</label>
                                        <input value="john@example.com" type="email"
                                            class="form-control bg-dark text-white border-secondary" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Password</label>
                                        <input value="password123" type="password"
                                            class="form-control bg-dark text-white border-secondary" />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Date of Birth</label>
                                        <input value="1990-05-15" type="date"
                                            class="form-control bg-dark text-white border-secondary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- About Me -->
                    <div class="card bg-black text-white mt-4">
                        <div class="card-body">
                            <h5 class="mb-3">About Me</h5>
                            <textarea rows="4"
                                class="form-control bg-dark text-white border-secondary">I’m open-minded and love meaningful connections. Exploring new experiences and meeting amazing people is what excites me!</textarea>
                        </div>
                    </div>

                    <!-- Interests -->
                    <div class="card bg-black text-white mt-4">
                        <div class="card-body">
                            <h5 class="mb-3">Interests</h5>
                            <input value="Travel, Music, Parties" type="text"
                                class="form-control bg-dark text-white border-secondary" />
                        </div>
                    </div>

                    <!-- Save Button -->
                    <div class="text-center mt-4">
                        <button type="button" class="btn bg-theme-color px-4">Save Changes</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">


</script>